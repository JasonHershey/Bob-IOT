# Tellus Consulting Bob IOT project
## Setup
Setup is based partially on the instructions from [Codefoster's IOT Workshop instructions](https://github.com/codefoster/iot-workshop).

### Hardware
- Raspberry Pi 3 B
- 4 GB SD Card
- Network cable
- Micro USB cable (for power)

### Software
- Raspbian Jessie Lite - Version June 2017 - Kernel 4.9 - Download from [Raspberrypi.org/downloads](https://www.raspberrypi.org/downloads/raspbian/)
- Etcher - Download from [etcher.io](https://etcher.io)

### Core software installation
These instructions will install an operating systema and Node.js.

1. Download Raspbian Jessie Lite from [Raspberrypi.org/downloads](http://Raspberrypi.org/downloads)
2. Install Etcher from [etcher.io](https://etcher.io)
3. Insert the SD card in your local computer
4. Install the Raspbian Jessie Lite image you downloaded to the SD card, using Etcher:

    1. Start **Etcher**.
    2. Click **Select image** and navigate to and select the zip file downloaded from Raspberrypi.org.
    3. Click **Select drive** and select the SD card.
    4. Click **Flash!** and wait for the image to install.

5. Eject and re-insert the SD card.
6. Create a file named **SSH** (no extension) on the root of the SD Card.
7. Eject the SD card and insert it in the Raspberry Pi.
8. Plug in power cable to the Raspberry Pi.
9. Plug in network cable to Raspberry Pi (plug in other end to your computer or router).
10. Log in to your raspberry pi

    1. Open a command window that supports SSH.

       > I use **Windows PowerShell**, and the **Git Shell**'s shell.ps1 configuration file, called from my profile at startup.

    2. From your command shell, type the following command and press ENTER:

        ```
        ssh pi@raspberrypi.local
        ```
 
     3. When prompted, enter the password **raspberry**

11. Verify wi-fi tools are installed.

    > Based on instructions from [https://www.maketecheasier.com/setup-wifi-on-raspberry-pi/](https://www.maketecheasier.com/setup-wifi-on-raspberry-pi/)

    - Run the command

        ```
        sudo apt-get install wpasupplicant wireless-tools
        ```

12. Update general wi-fi configurations. Run the command:

    ```
    sudo nano /etc/network/interfaces
    ```

13. Update the section that starts with **allow-hotplug wlan0** to match the following:

    ```
    allow-hotplug wlan0
    iface wlan0 inet manual
        wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
    iface default inet dhcp
    ```
  
14. Press **CTRL+X** to exit nano. Press **Y** and press ENTER to SAVE the file, and press ENTER again to save it.

15. Get a list of available wireless networks. Run the command:

    ```
    sudo iwlist wlan0 scan | grep ESSID
    ```
  
    > **grep ESSID** returns just the lines containing **ESSID**, which show the network names.
  
16. Update the wpa_supplicant configuration file. Run the command:

    ```
    sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
    ```
  
17. Add the following to the file:

    ```
    network={
        ssid="<Wireless Network Name>"
        psk="<network password>"
        key_mgmt=WPA-PSK
        }
    ```
  
    - Replace the text *\<Wireless Network Name\>* with the name of your network.
    - Replace the text *\<network passowrd\>* with your network password.
  
18. Exit Nano and save the file.

19. Update other Raspberry Configration options using the **Raspberry Pi Software Configuration Tool (raspi-config). Run the command:

    ```
    sudo raspi-config
    ```

20. Change the user password on your device
    1. In **raspi-config** select **1 Change User Password**.
    2. Select **Ok**.
    3. In the shell, type your new password and press Enter.
    4. Confirm your password and press Enter.
    5. In **raspi-config** select **Ok**.

21. Change the host name for your device (from *raspberrypi*)
    1. In **raspi-config** select **2 Hostname**.
    2. Select **Ok**.
    3. Type your new host name and press Enter.

22. Change the locale options
    1. In **raspi-config** select **4 Localisation Options**.
    2. Select **I1 Change Loocale**.
    3. On the **Configuring locales** page, use the arrow keys to scroll through the list, and SPACEBAR to select your language and locale setting.
      
        > I chose en_US.UTF-8

    4. Press ENTER and on the next page, select the language you just chose and press ENTER.

    5. Update the **Timezone** and **Wi-fi Country** as needed from the same **Localisation Options** menu.
    6. When finished, in **raspi-config** select **Finish** and press ENTER.
    7. Select **Yes** to reboot your Raspberry Pi

23. Log in to your Raspberry Pi, again, using the new host name (**pi@_hostname_.local**)

24. Install Node.js on the device
    1. Check [Nodejs.org](http://nodejs.org) to verify what the current or latest version is.
        > At the time of this instruction, the Long Term Support (LTS) version was 6.11.0 and current 8.1.3. I used current.
    2. In bash, run the following commands:
        ```
        cUrl -sL http://deb.nodesource/com/Setup_8.x | sudo -E bash
        sudo  apt-get -y install nodejs
        ```

### Set up your development environment
These instructions will setup your development environment on your host computer and in Microsoft Azure. 
If you have your local development environment set up already, you can skip some of this.

1. Set up Visual Studio Code.  Why VS Code? Because its free and easy.
    1. Navigate to [https://code.visualstudio.com/](https://code.visualstudio.com/)
    2. Click **Download for Windows** (or whatever OS you use)
    3. Run the installer and follow the prompts as appropriate.

2. Sign up for an Azure account. You can do a free trial or simply sign up for pay-as-you-go.
    > There are several services you can use for free, as long as your usage is low.

    - Navigate to [Azure.com](http://Azure.com) and click **Free Account**
        -or-
        Navigate to [portal.azure.com](http://portal.azure.com)

3. Create an Azure IoT Hub
    1. In the Azure portal \([portal.azure.com](http://portal.azure.com)\), click **+ New**.
    2. Click **Internet of Things** and then click **IoT Hub**.
    3. Enter a **Name** for your IoT Hub.
    4. Select a **Pricing and scale tier**.
        > The **F1** tier is free.
    5. Select the number of units.
        > 1 is sufficient.
    6. Under **Resource group** select **Create new** and enter a name for the resource group.
    7. Select the **Location** that is closest to you.
    8. Click **Create**.

4. Get the connection string for your IoT Hub.
    1. In the Azure portal, open your IoT Hub.
        > The setup of your dashboard will affect how you find your IoT Hub. If all else fails, click **All resources** in the left-hand menu, and select your IoT Hub.
    2. In the IoT Hub blade, select **Shared access policies**.
    3. Select **iothubowner**.
    4. Copy the **Connection string-primary key**.

5. Install IoT Hub Explorer
    - On your local computer, in the command shell, run the following command:
    
        ```
        npm install -g iothub-explorer
        ```

6. Add your device to IoT Hub
    1. In the command shell, run the following command:

        ```
        iothub-explorer login '<connection string>'
        ```
    Replacing *\<connection string\>* with the connection string you copied from your IoT Hub.

    2. Run the following command:

        ```
        iothub-explorer create '<device id>'
        ```
    Replace *\<device id\>* with a unique ID for your device

7. Install Node.js on your local machine.
    1. Navigate to [nodejs.org](http://nodejs.org).
    2. Click the link for the version of Node.js you want to install.
    3. Run the installer and follow the prompts as appropriate.

8. Create and initialize your local development folder.
    1. On your local machine, in the command shell, navigate to the location where you want to create your development folder.
    2. In the command shell, run the following command:
        ```
        new-item device -Type directory
        ```

        > Keep in mind, I'm using Windows PowerShell.
    
    3. Navigate to the **device** folder.
    4. Initialize the folder by running the following command:
        ```
        npm init -y
        ```

9. Install the code dependency libraries. They are:
    - johnny-five - Libraries that allow you to talk to the Raspberry Pi easily
    - azure-iot-device - Libraries for Azure IoT SDK
    - azure-iot-device-amqp - AMQP transport for Azure IoT SDK

    Run the following command:

        ```
        npm install johnny-five azure-iot-device azure-iot-device-amqp
        ```
    > There will likely be some errors from the johnny-five install.

10. Create your default js file **index.js**.
    1. Open Visual Studio Code.
    2. Click **File** and then click **Open Folder**
    3. Navigate to the **device** development folder and click **Select folder**.
    4. Click **New file** and enter the file name **index.js**.
    5. Enter the following code into the file:
        ``` js
        // index.js
        //'use strict';

        //Load dependencies
        var five = require('johnny-five');
        var raspi = require ('raspi-io');
        var device = require('azure-iot-device');
        var deviceAmqp = require('azure-iot-device-amqp');

        //INIT
        let connectionString = '<connection string>';
        let hubClient = deviceAmqp.clientFromConnectionString(connectionString);

        //MAIN CODE
        //establishing connection to gpio
        log('establishing connection to gpio...');
            let board = new five.Board({ io: new raspi() });
        board.on('ready', () => {
            let led = new five.Led('GPIO26');
            let button = new five.Button('GPIO20');
            led.stop().off();

            //open connection to iot hub
            log('connecting to iot hub...');
            hubClient.open(err => {
                if (err)
                    log(err.message)
                else {
                    log('READY');
                    led.stop().off();

                    button.on('press', () => {
                        led.blink(500);
                        log('sending message to iot hub...');
                        let message = new device.Message(JSON.stringify({ deviceId: '<device id>', tags: ['foo', 'baz', 'bar'] }));
                                hubClient.sendEvent(message, (err, res) => {
                                    if (err) log(err.message);
                                    else {
                                                log(`Sent message to your IoT Hub`);
                                                log('READY');
                                            }
                                            led.stop().off();
                                        });
                                    });
                            }
                        });
                    });
            

        function log(msg) {
            console.log(msg);
        }
        ```

    



25. Install johnny-five javascript libraries on your device
    The johnny-five javascript libraries let you talk to your device.  Run this command in bash:
    ```
    npm install johnny-five
    ```
    






