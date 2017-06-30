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

  a. Start **Etcher**.
  b. Click **Select image** and navigate to and select the zip file downloaded from Raspberrypi.org.
  c. Click **Select drive** and select the SD card.
  d. Click **Flash!** and wait for the image to install.

5. Eject and re-insert the SD card.
6. Create a file named **SSH** (no extension) on the root of the SD Card.
7. Eject the SD card and insert it in the Raspberry Pi.
8. Plug in power cable to the Raspberry Pi.
9. Plug in network cable to Raspberry Pi (plug in other end to your computer or router).
10. Log in to your raspberry pi

  a. Open a command window that supports SSH.
    > I use **Windows PowerShell**, and the **Git Shell**'s shell.ps1 configuration file, called from my profile at startup.

  b. From your command shell, type the following command and press ENTER:

  ```
    ssh pi@raspberrypi.local
  ```
  c. When prompted, enter the password **raspberry**

10. Verify wi-fi tools are installed.

  > Based on instructions from [https://www.maketecheasier.com/setup-wifi-on-raspberry-pi/](https://www.maketecheasier.com/setup-wifi-on-raspberry-pi/)

  - Run the command

  ```
    sudo apt-get install wpasupplicant wireless-tools
  ```

11. Update general wi-fi configurations. Run the command:

  ```
  sudo nano /etc/network/interfaces
  ```
12. Update the section that starts with **allow-hotplug wlan0** to match the following:

  ```
  allow-hotplug wlan0
  iface wlan0 inet manual
      wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
  iface default inet dhcp
  ```
  
13. Press **CTRL+X** to exit nano. Press **Y** and press ENTER to SAVE the file, and press ENTER again to save it.

14. Get a list of available wireless networks. Run the command:

  ```
  sudo iwlist wlan0 scan | grep ESSID
  ```
  
  > **grep ESSID** returns just the lines containing **ESSID**, which show the network names.
  
15. Update the wpa_supplicant configuration file. Run the command:

  ```
  sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
  ```
  
16. Add the following to the file:

  ```
  network={
      ssid="<Wireless Network Name>"
      psk="<network password>"
      key_mgmt=WPA-PSK
      }
  ```
  
  Replace the text *\<Wireless Network Name\>* withthe name of your network.
  Replace the text *\<network passowrd\>* with your network password.
  
17. Exit Nano and save the file.

18. Update other Raspberry Configration options using the **Raspberry Pi Software Configuration Tool (raspi-config). Run the command:

  ```
  sudo raspi-config
  ```

19. Change the user password on your device
  a. In **raspi-config** select **1 Change User Password**.
  b. Select **Ok**.
  c. In the shell, type your new password and press Enter.
  d. Confirm your password and press Enter.
  e. In **raspi-config** select **Ok**.

20. Change the host name for your device (from *raspberrypi*)
  a. In **raspi-config** select **2 Hostname**.
  b. Select **Ok**.
  c. Type your new host name and press Enter.

21. Change the locale options
  a. In **raspi-config** select **4 Localisation Options**.
  b. Select **I1 Change Loocale**.
  c. On the **Configuring locales** page, use the arrow keys to scroll through the list, and SPACEBAR to select your language and locale setting.
    > I chose en_US.UTF-8
  d. Press ENTER and on the next page, select the language you just chose and press ENTER.
  e. Update the **Timezone** and **Wi-fi Country** as needed from the same **Localisation Options** menu.
  f. When finished, in **raspi-config** select **Finish** and press ENTER.
  g. Select **Yes** to reboot your Raspberry Pi


