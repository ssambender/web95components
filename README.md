
# web95components

Windows 95 themed web components in vanilla JS

![Demo screenshot](https://github.com/ssambender/web95components/blob/main/images/demoScreenshot.png?raw=true)

## Setup

Download the ```web95-components.js``` file and add to project

Make sure to include ```<script type="module" src="web95-components.js"></script>``` somewhere in the HTML
## Component usage

⠀
![Window screenshot](https://github.com/ssambender/web95components/blob/main/images/windowScreenshot.png?raw=true)

#### Window - Moveable popup window container 

```<web95-window  window-name=String  window-height=int  window-width=int>  </web95-window>```
  - *window-name:* the name that displays on the top of the window (String)

  - *window-height:* the window height in px (int)

  - *window-width:* the window width in px (int)

  - *slotted content:* the content of the window (HTML)

---  
⠀

![Taskbar screenshot](https://github.com/ssambender/web95components/blob/main/images/taskbarScreenshot.png?raw=true)

#### Taskbar - Footer that can contain buttons 

```<web95-taskbar>  </web95-taskbar>```


  - *slotted content:* the content of the taskbar (HTML)


---  
⠀

![Website screenshot](https://github.com/ssambender/web95components/blob/main/images/websiteScreenshot.png?raw=true)

#### Website - Searchable iframe that can be contained in a <web95-window>

```<web95-website  website-url=String>  </web95-website>```
  - *website-url:* the link or src that the iframe will display (String)


---  
⠀

![Email screenshot](https://github.com/ssambender/web95components/blob/main/images/emailScreenshot.png?raw=true)

#### Email - Form that can be filled out and sent as email contained in a <web95-window>

```<web95-email  email-to=String  email-subject=String  email-body=String>  </web95-email>```
  - *email-to:* auto-fills who the email is sent to (String)

  - *email-subject:* auto-fills the subject line (String)

  - *window-body:* auto-fills the email body message (String)


---  
⠀

![Button screenshot](https://github.com/ssambender/web95components/blob/main/images/buttonScreenshot.png?raw=true)

#### Button - Just a button, can be used to directly call functions

```<web95-button  square  border  click-func=String>  </web95-button>```
  - *square:* makes the button a square, can be useful for CLOSE buttons in windows

  - *border:* applies a border to the button

  - *click-func:* calls whatever function name is entered, no ( ) needed just the func name (String)

  - *slotted content:* the text content of the button (HTML)


  ---  
⠀

![Shortcut screenshot](https://github.com/ssambender/web95components/blob/main/images/shortcutScreenshot.png?raw=true)

#### Shortcut - Desktop icon style <a> icon 

```<web95-shortcut  icon-src=String  click-func=String>  </web95-shortcut>```
  - *icon-src:* the source for the image to be shown as the icon (String/path)

  - *click-func:* calls whatever function name is entered, no ( ) needed just the func name (String)

  - *slotted content:* the text label of the shortcut under the icon (text)

---  
⠀

![Game screenshot](https://github.com/ssambender/web95components/blob/main/images/gameScreenshot.png?raw=true)

#### Game - Game iframe that can be contained in a <web95-window>

```<web95-game  game=String>  </web95-game>```
  - *game:* what game the window plays, defaults to pacman *(below)*

    - *game="minesweeper:"* minesweeper

    - *game="solitaire:"* solitaire

    - *game="tetris:"* tetris

---  
⠀
![Clouds class screenshot](https://github.com/ssambender/web95components/blob/main/images/cloudsScreenshot.png?raw=true)

#### Clouds (class) - Applys the classic Windows clouds background to the div

```class="clouds"```
  - give this class to any div that should have a clouds bg

  ---  
## Contributing and License

Contributions are always welcome, feel free to add whatever you like and submit pull requests to add it to here, or make your own forks.

With the GNU license you just need to keep the project open source and available to all :)
