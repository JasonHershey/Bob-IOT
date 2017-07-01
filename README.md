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

### Instructions
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
    1. Check Nodejs.org to verify what the current or latest version is.
        > At the time of this instruction, the Long Term Support (LTS) version was 6.11.0 and current 8.1.3. I used current.
    2. In bash, run the following commands:
        ```
        cUrl -sL http://deb.nodesource/com/Setup_8.x | sudo -E bash
        sudo  apt-get -y install nodejs
        ```










