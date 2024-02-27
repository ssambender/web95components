// IMPORT FUN WINDOWS95 PIXEL ART TYPE FONT
var web95font = document.createElement('link');
web95font.setAttribute('rel', 'stylesheet');
web95font.setAttribute('type', 'text/css');
web95font.setAttribute('href', 'https://fonts.cdnfonts.com/css/w95fa');
document.head.appendChild(web95font);

// CREATE CLOUDS BG CLASS
var cloudsClass = document.createElement('style');
cloudsClass.type = 'text/css';
cloudsClass.innerHTML = '.clouds { overflow: hidden; background-repeat: no-repeat; background: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b4a30557-d52f-4b80-8f92-72942d71184d/ddsmcyj-90928fc0-7eaf-46ff-a132-50650a9d98de.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I0YTMwNTU3LWQ1MmYtNGI4MC04ZjkyLTcyOTQyZDcxMTg0ZFwvZGRzbWN5ai05MDkyOGZjMC03ZWFmLTQ2ZmYtYTEzMi01MDY1MGE5ZDk4ZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.HUFV3e7si03_XG2oNjwdxZ92pnKeDw3gUofT73pm0Ss"); background-size: cover; }';
document.getElementsByTagName('head')[0].appendChild(cloudsClass);
// now anything with  class="clouds"  will have a clouds bg

//let bgColor = "#008080"

// EXTEND HTMLElement CLASS TO CREATE WEB COMPONENT
class Web95Window extends HTMLElement {
    constructor() {
        super();

        //console.log('Constructed', this);

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Get attributes
        let windowName = this.getAttribute('window-name') || "Window";
        const width = parseInt(this.getAttribute('window-width')) || 450;
        const height = parseInt(this.getAttribute('window-height')) || 200;

        // Render HTML with attribute values
        this.shadowRoot.innerHTML = `
            <div id="mydiv" style="width: ${width}px; height: ${height}px;">
                <div id="mydivheader">
                    <span>${windowName}</span>
                    <span id="windowNavButtons">
                        <a><web95-button square bold>_</web95-button></a>
                        <a><web95-button square bold>❒</web95-button></a>
                        <a id="closeWindow"><web95-button square bold>X</web95-button></a>
                    </span>
                </div>
                <div id="mydivbody">
                    ${this.innerHTML}
                </div>
            </div>
            
            <style>
                :host {
                    font-family: 'W95FA', sans-serif;
                }
                #mydiv {
                  position: absolute;
                  z-index: 100;
                  background-color: #C0C0C0;
                  text-align: center;
                  width: ${width}px;
                  height: ${height}px;
                  user-select: none;
                  overflow: hidden;
                  
                  padding: 2px 2px 20px 2px;
                  
                  border-top: 2px solid white;
                  border-left: 2px solid white;
                  border-right: 2px solid #393939;
                  border-bottom: 2px solid #393939;
                  border-radius: 0;
                }
                
                #mydivheader {
                  padding: 3px 10px;
                  cursor: move;
                  background-color: #000181;
                  /**background: linear-gradient(90deg, #000181, #99ceff);**/
                  color: #fff;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
                #mydivheader a {
                    cursor: pointer;
                }
                
                #mydivbody {
                    padding: 8px;
                    height: 95%;
                }
                
                #windowNavButtons {
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                }
                #windowNavButtons a {
                    margin-left: 3px;
                }
            </style>
        `;

        this.makeDraggable();

        const closeLink = this.shadowRoot.querySelector('#closeWindow');
        closeLink.addEventListener('click', this.closeWindow.bind(this));
    }

    connectedCallback() {
        //console.log('connected!', this);

        // Update window name
        const windowNameSpan = this.shadowRoot.querySelector('#mydivheader span:first-child');
        windowNameSpan.textContent = this.getAttribute('window-name');
        // If blank then make the window name something random from below
        if (windowNameSpan.textContent === "") {
            let names = ["Radical","Righteous","Swag","Tubular","Bodacious","Radical","Da Bomb","Phat"];
            windowNameSpan.textContent = names[Math.floor(Math.random() * names.length)];
        }

        // Get the window element
        const mydiv = this.shadowRoot.getElementById('mydiv');
        // Get the screen dimensions
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        // Calculate random positions
        const randomX = Math.floor(Math.random() * (screenWidth - mydiv.offsetWidth));
        const randomY = Math.floor(Math.random() * (screenHeight - mydiv.offsetHeight));
        // Apply the random positions
        mydiv.style.left = randomX + 'px';
        mydiv.style.top = randomY + 'px';

        mydiv.style.width = this.getAttribute('window-width') + 'px';
        mydiv.style.height = this.getAttribute('window-height') + 'px';

        //this.shadowRoot.getElementById('windowNavButtons').querySelector('#closeWindow').style.backgroundColor = 'red';
    }

    disconnectedCallback() {
        //console.log('disconnected', this);
    }

    makeDraggable() {
        const mydiv = this.shadowRoot.getElementById('mydiv');
        const mydivheader = this.shadowRoot.getElementById('mydivheader');

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        mydivheader.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            mydiv.style.top = (mydiv.offsetTop - pos2) + "px";
            mydiv.style.left = (mydiv.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    closeWindow() {
        this.remove(); // Remove the window component from the DOM
    }
}
class Web95Button extends HTMLElement {
    constructor() {
        super();
        //console.log('Constructed', this);

        // Create a shadow root
        this.attachShadow({ mode: 'open' });

        // Define the button element
        const button = document.createElement('button');

        // Create a span for the button text
        const buttonText = document.createElement('span');
        buttonText.classList.add('buttonText');
        buttonText.innerHTML = this.innerHTML;

        // Clear innerHTML so that slotted content is not duplicated
        this.innerHTML = '';

        // Append the button text span to the button
        button.appendChild(buttonText);

        // Append the button to the shadow root
        this.shadowRoot.appendChild(button);

        // Apply styles
        this.applyStyles();

        const functionName = this.getAttribute('click-func');

        // Add click event listener
        button.addEventListener('click', this.handleButtonClick.bind(this));

        button.addEventListener('click', () => {
            if (functionName && typeof window[functionName] === 'function') {
                window[functionName]();
            }
        });
    }

    connectedCallback() {
        //console.log('connected!', this);
    }

    disconnectedCallback() {
        //console.log('disconnected', this);
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            button {
                position: relative;
                transition: all 0.2s ease;
                letter-spacing: 0.025em;
                font-size: .6rem;
                border-radius: 0.125rem;
                padding: .6rem 2rem;
                max-height: 37px;
                color: #000;
                background-color: #c0c0c0;
                border-color: #a0a0a0;
                font-family: 'W95FA', sans-serif;
                overflow-y: hidden;
            }
            button:focus {
                box-shadow: none
            }
            button:before,
            button:after {
                content: '';
                position: absolute;
                box-sizing: border-box;
                display: block;
                background: transparent;
                z-index: 9;
                top: 0;
                left: 0;
            }
            button:active:before,
            button:active:focus:before {
                border-color: transparent;
                color: #000;
            }
            button:before {
                width: 100%;
                height: 100%;
                border-top: 2px solid white;
                border-left: 2px solid white;
                border-right: 2px solid #858585;
                border-bottom: 2px solid #858585;
            }
            
            button .buttonText {
                box-sizing: border-box;
                padding: 0 2px;
            }
            button:active .buttonText, button:focus .buttonText {
                border: dotted 1px black;
                padding: 0 1px;
            }
        `;

        // Add border class conditionally
        if (this.hasAttribute('border')) {
            style.textContent += `
                button {
                    /* border attribuite button styles */
                    border: 2px solid black;
                }
            `;
        }

        if (this.hasAttribute('square')) {
            style.textContent += `
            button {
                width: 24px;
                height: 24px;
                padding: 0;
                overflow: hidden;
            }
            button img {
                width: 50%;
                height: 50%;
            }
        `;
        }

        if (this.hasAttribute('bold')) {
            style.textContent += `
            button {
                font-weight: bold;
            }
        `;
        }

        this.shadowRoot.appendChild(style);
    }

    handleButtonClick() {
        //console.log(this, ' button clicked!');
    }
}
class Web95Shortcut extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.setAttribute('class', 'container');

        const anchor = document.createElement('a');

        const img = document.createElement('img');
        const iconSrc = this.getAttribute('icon-src');
        if (iconSrc) {
            img.setAttribute('src', iconSrc);
        }

        anchor.appendChild(img);

        container.appendChild(anchor);

        const slottedTextContainer = document.createElement('div');
        slottedTextContainer.setAttribute('class', 'slotted-text');
        slottedTextContainer.innerText = this.innerHTML;
        this.innerHTML = '';

        container.appendChild(slottedTextContainer);

        this.shadowRoot.appendChild(container);

        this.applyStyles();

        this.setAttribute('tabindex', '0');

        let functionName = this.getAttribute('click-func');
        this.addEventListener('click', () => {
            if (functionName && typeof window[functionName] === 'function') {
                window[functionName]();
            }
        });

        this.addEventListener('click', this.handleAnchorClick.bind(this));
        this.addEventListener('keydown', this.handleEnterKeyPress.bind(this)); // Add event listener for keydown event
    }

    connectedCallback() {
        //console.log('connected!', this);
    }

    disconnectedCallback() {
        //console.log('disconnected', this);
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                width: 64px;
                box-sizing: border-box;
            }
            :host(:focus) .slotted-text {
                border: dotted 1px black;
                box-sizing: border-box;
            }
            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: white;
                font-family: 'W95FA', sans-serif;
                margin: 8px 0;
                user-select: none;
            }
            a {
                display: flex;
                text-decoration: none;
                width: 64px;
                height: 64px;
                overflow: hidden;
                justify-content: center;
                align-items: center;
            }
            img {
                max-width: 100%;
                height: auto;
            }
            .slotted-text {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
        `;

        this.shadowRoot.appendChild(style);
    }


    handleAnchorClick() {
        //console.log(this, ' anchor clicked!');
    }
    handleEnterKeyPress(event) {
        if (event.key === 'Enter') {
            this.click(); // Trigger click event when Enter key is pressed
        }
    }
}
class Web95Website extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const websiteContainer = document.createElement('div');
        websiteContainer.style.display = 'flex';
        websiteContainer.style.flexDirection = 'column';

        // Create the textarea and button container
        const searchBarContainer = document.createElement('div');
        searchBarContainer.style.display = 'flex';
        searchBarContainer.style.marginBottom = '6px';
        searchBarContainer.style.alignItems = 'center';
        searchBarContainer.style.justifyContent = 'space-between';

        // Create and configure the textarea
        const textarea = document.createElement('textarea');
        textarea.style.overflow = 'hidden';
        textarea.style.fontFamily = "'W95FA', sans-serif";
        textarea.style.height = '18px';
        textarea.style.padding = '4px 0 0 4px';
        textarea.style.resize = 'none';
        textarea.style.width = '93%';
        textarea.style.display = 'flex';
        textarea.style.alignItems = 'center';
        textarea.value = this.getAttribute('website-url') || 'https://www.spacejam.com/1996/';


        // SEARCH BUTTON - BROKEN
        // Create and configure the button
        const searchButton = document.createElement('web95-button');
        searchButton.setAttribute('square', '');

        const buttonTextSpan = searchButton.shadowRoot.querySelector('.buttonText');

        //buttonTextSpan.style.width = '100%';
        //buttonTextSpan.style.height = '100%';

        const img = document.createElement('img');
        img.src = 'https://cdn-icons-png.flaticon.com/512/61/61088.png';

        buttonTextSpan.appendChild(img);

        const button = searchButton.shadowRoot.querySelector('button');

        button.style.width = '24px';
        button.style.height = '24px';
        button.style.padding = '0';
        button.style.overflow = 'hidden';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';

        //const img = button.querySelector('img');
        img.style.width = '60%';
        img.style.height = '60%';
        img.style.padding = '2px 0 0 0';
        img.style.margin = '0';

        // Append textarea and button to the searchBarContainer
        searchBarContainer.appendChild(textarea);
        searchBarContainer.appendChild(searchButton);

        // Create and configure the iframe
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.spacejam.com/1996/';
        iframe.title = 'description';
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        iframe.style.marginBottom = '6px';

        // Create and configure the "OPEN EXTERNAL" button
        const openExternalButton = document.createElement('web95-button');
        const button2 = openExternalButton.shadowRoot.querySelector('button');
        button2.textContent = 'OPEN AS EXTERNAL';

        // Append elements to websiteContainer
        websiteContainer.appendChild(searchBarContainer);
        websiteContainer.appendChild(iframe);
        websiteContainer.appendChild(openExternalButton);

        // Append websiteContainer to shadow root
        this.shadowRoot.appendChild(websiteContainer);

        searchButton.addEventListener('click', () => {
            // Update the iframe src with the value from the textarea
            updatePage();
        });

        // Apply styles
        this.applyStyles();

        // Add click event listener
        openExternalButton.addEventListener('click', () => {
            // Update the iframe src with the value from the textarea
            console.log("opening external website to: ", textarea.value);
            const url = textarea.value;
            if (url) {
                window.open(url, '_blank');
            }
        });


        textarea.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                updatePage();
            }
        });

        // https://sambender.net
        // https://www.google.com/search?igu=1

        // only update the page if the url is a new one
        let newUrl;
        const updatePage = () => {
            if (textarea.value !== newUrl) {

                newUrl = textarea.value;
                if (newUrl === "google.com" || newUrl === "https://google.com" || newUrl === "google") {
                    newUrl = "https://www.google.com/search?igu=1";
                }
                else {
                    if (!newUrl.startsWith("https://")) {
                        newUrl = "https://" + newUrl;
                    }
                }

                //const parentElement = this.parentNode;
                //if (parentElement instanceof Web95Window) {
                //    const windowNameSpan = parentElement.shadowRoot.querySelector('#mydivheader span:first-child');
                //    windowNameSpan.textContent = "WorldWideWeb:  " + newUrl.toString(); // Update the text to the new URL
                //    console.log("UPDATING NAME OF PARENT WINDOW");
                //}

                iframe.src = newUrl;
                textarea.value = newUrl;

                console.log("updating website to: ", newUrl);

            }
        }
        updatePage();
    }

    //how to call a constructor function in javascript on connectedcallback
    connectedCallback() {
        //console.log('connected!', this);
    }

    disconnectedCallback() {
        //console.log('disconnected', this);
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Add any styles here */
        `;
        this.shadowRoot.appendChild(style);
    }

    handleButtonClick() {
        console.log(this, ' button clicked!');
    }
}
class Web95Email extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        //this.style.height = "116%";
        //this.style.display = "flex";
        //this.style.flexDirection = "column";

        const emailContainer = document.createElement('div');
        emailContainer.style.display = 'flex';
        emailContainer.style.flexDirection = 'column';
        emailContainer.style.height = '100%';
        emailContainer.style.width = '100%';

        const inputLine1 = document.createElement('div');
        inputLine1.classList.add('emailInputLine');
        inputLine1.style.display = 'flex';
        inputLine1.style.resize = 'none';
        const label1 = document.createElement('span');
        label1.textContent = "FROM";
        inputLine1.appendChild(label1);
        const inputField1 = document.createElement('input');
        inputField1.type = 'text';
        inputField1.id = "inputField1";
        inputField1.placeholder = "example@aol.com";
        inputLine1.appendChild(inputField1);

        const inputLine2 = document.createElement('div');
        inputLine2.classList.add('emailInputLine');
        inputLine2.style.display = 'flex';
        inputLine2.style.resize = 'none';
        const label2 = document.createElement('span');
        label2.textContent = "TO";
        inputLine2.appendChild(label2);
        const inputField2 = document.createElement('input');
        inputField2.type = 'text';
        inputField2.id = "inputField2";
        inputField2.placeholder = "example@gmail.com";
        inputLine2.appendChild(inputField2);

        const inputLine3 = document.createElement('div');
        inputLine3.classList.add('emailInputLine');
        inputLine3.style.display = 'flex';
        inputLine3.style.resize = 'none';
        const label3 = document.createElement('span');
        label3.textContent = "CC";
        inputLine3.appendChild(label3);
        const inputField3 = document.createElement('input');
        inputField3.type = 'text';
        inputField3.id = "inputField3";
        inputField3.placeholder = "example@yahoo.com";
        inputLine3.appendChild(inputField3);

        const inputLine4 = document.createElement('div');
        inputLine4.classList.add('emailInputLine');
        inputLine4.style.display = 'flex';
        inputLine4.style.resize = 'none';
        const label4 = document.createElement('span');
        label4.textContent = "SUBJECT";
        inputLine4.appendChild(label4);
        const inputField4 = document.createElement('input');
        inputField4.type = 'text';
        inputField4.id = "inputField4";
        inputField4.placeholder = "Subject line...";
        inputLine4.appendChild(inputField4);

        emailContainer.appendChild(inputLine1);
        emailContainer.appendChild(inputLine2);
        emailContainer.appendChild(inputLine3);
        emailContainer.appendChild(inputLine4);


        const emailBodyTextarea = document.createElement('textarea');
        emailBodyTextarea.style.backgroundColor = 'white';
        emailBodyTextarea.style.height = '70%';
        emailBodyTextarea.style.width = '98%';
        emailBodyTextarea.style.resize = 'none';
        emailBodyTextarea.style.paddingTop = '8px';
        emailBodyTextarea.style.display = 'flex';
        emailBodyTextarea.style.alignItems = 'center';
        emailBodyTextarea.style.marginTop = '10px';
        emailBodyTextarea.style.marginBottom = '12px';
        emailBodyTextarea.style.overflowY = 'scroll';
        emailContainer.appendChild(emailBodyTextarea);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'right';
        buttonContainer.style.paddingRight = '5%';
        emailContainer.appendChild(buttonContainer);

        const sendButton = document.createElement('web95-button');
        sendButton.shadowRoot.querySelector('.buttonText').innerText = 'SEND!';
        sendButton.addEventListener('click', () => this.handleButtonClick());
        buttonContainer.appendChild(sendButton);

        this.shadowRoot.appendChild(emailContainer);

        this.applyStyles();
    }

    connectedCallback() {
        this.shadowRoot.getElementById('inputField2').value = this.getAttribute('email-to') || '';
        this.shadowRoot.getElementById('inputField3').value = this.getAttribute('email-cc') || '';
        this.shadowRoot.getElementById('inputField4').value = this.getAttribute('email-subject') || '';
        this.shadowRoot.querySelector('textarea').value = this.getAttribute('email-body') || '';
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Add any styles here */

            .emailInputLine {
                font-family: 'W95FA', sans-serif;
            }
            
            .emailInputLine span {
                width: 10%;
                display: flex;
                justify-content: right;
                padding-right: 4px;
                align-items: center;
            }
            
            .emailInputLine input {
                resize: none;
                height: 35%;
                margin-top: 6px;
                padding-top: 4px;
                padding-bottom: 4px;
                margin-left: 5%;
                width: 70%;
                font-family: 'W95FA', sans-serif;
            }
            
            textarea {
                font-family: 'W95FA', sans-serif;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    handleButtonClick() {
        const to = this.shadowRoot.getElementById('inputField2').value;
        const cc = this.shadowRoot.getElementById('inputField3').value;
        const subject = this.shadowRoot.getElementById('inputField4').value;
        const body = this.shadowRoot.querySelector('textarea').value;
        let mailtoLink = 'mailto:' + encodeURIComponent(to);
        if (cc) {
            mailtoLink += '?cc=' + encodeURIComponent(cc);
        }
        if (subject) {
            mailtoLink += (cc ? '&' : '?') + 'subject=' + encodeURIComponent(subject);
        }
        if (body) {
            mailtoLink += (cc || subject ? '&' : '?') + 'body=' + encodeURIComponent(body);
        }
        // Open the mailto link in a new window
        window.open(mailtoLink);
    }
}
class Web95Taskbar extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const taskbarContainer = document.createElement('div');
        taskbarContainer.classList.add('taskbar');

        // Create START button
        const startButton = document.createElement('web95-button');
        startButton.style.height = '100%';
        startButton.style.display = 'flex';
        startButton.style.alignItems = 'center';
        startButton.style.marginRight = '4px';
        const button2 = startButton.shadowRoot.querySelector('button');
        button2.textContent = 'START';
        button2.style.height = '100%';
        button2.style.overflow = 'hidden';
        button2.style.padding = '0 8px';
        button2.style.fontSize = '16px';
        button2.style.display = 'flex';
        button2.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = 'https://win98icons.alexmeub.com/icons/png/windows-0.png';
        img.width = 18;
        img.height = 18;
        button2.insertBefore(img, button2.firstChild);

        taskbarContainer.appendChild(startButton);

        
        // other windows
        const newWindowTab = document.createElement('web95-button');
        newWindowTab.style.height = '100%';
        newWindowTab.style.display = 'flex';
        newWindowTab.style.alignItems = 'center';
        newWindowTab.style.marginRight = '4px';
        const newWindowTabBtn = newWindowTab.shadowRoot.querySelector('button');
        newWindowTabBtn.textContent = 'World Wide Web';
        newWindowTabBtn.style.height = '100%';
        newWindowTabBtn.style.overflow = 'hidden';
        newWindowTabBtn.style.padding = '0 16px';
        newWindowTabBtn.style.fontSize = '16px';
        newWindowTabBtn.style.display = 'flex';
        newWindowTabBtn.style.alignItems = 'center';
        taskbarContainer.appendChild(newWindowTab);


        const newWindowTab2 = document.createElement('web95-button');
        newWindowTab2.style.height = '100%';
        newWindowTab2.style.display = 'flex';
        newWindowTab2.style.alignItems = 'center';
        newWindowTab2.style.marginRight = '4px';
        const newWindowTab2Btn = newWindowTab2.shadowRoot.querySelector('button');
        newWindowTab2Btn.textContent = 'E-Mail';
        newWindowTab2Btn.style.height = '100%';
        newWindowTab2Btn.style.overflow = 'hidden';
        newWindowTab2Btn.style.padding = '0 16px';
        newWindowTab2Btn.style.fontSize = '16px';
        newWindowTab2Btn.style.display = 'flex';
        newWindowTab2Btn.style.alignItems = 'center';
        taskbarContainer.appendChild(newWindowTab2);


        this.shadowRoot.appendChild(taskbarContainer);

        // Apply styles
        this.applyStyles();
    }

    connectedCallback() {
        //console.log('connected!', this);
    }

    disconnectedCallback() {
        //console.log('disconnected', this);
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .taskbar {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100vw;
                height: 4vh;
                z-index:  1234;
                background-color: #C0C0C0;
                display: flex;
                align-items: center;
                padding: 2px;
                box-sizing: border-box;
                border-top: solid 1px white;
                border-left: solid 1px white;
                border-right: solid 1px #858585;
                border-bottom: solid 1px #858585;
                overflow: hidden;
            }
        `;
        this.shadowRoot.appendChild(style);
    }
}

class Web95Game extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.updateGame();
    }

    connectedCallback() {
        this.updateGame();
    }

    updateGame() {
        const game = this.getAttribute('game');
        const gameWindowContainer = document.createElement('web95-window');

        const gameIframeContainer = document.createElement('div');
        gameIframeContainer.style.width = '100%';
        gameIframeContainer.style.height = '100%';
        gameIframeContainer.style.overflow = 'hidden';

        const gameIfame = document.createElement('iframe');
        gameIfame.style.width = '100%';
        gameIfame.style.height = '100%';
        gameIfame.style.overflow = 'hidden';

        if (game === 'tetris') {
            gameWindowContainer.setAttribute('window-name', "Tetris");
            gameWindowContainer.setAttribute('window-height', '600');
            gameWindowContainer.setAttribute('window-width', '400');
            gameIfame.src = 'https://www.play-tetris-online.com/tetris-html5/';
        } else if (game === 'solitaire') {
            gameWindowContainer.setAttribute('window-name', "Solitaire");
            gameWindowContainer.setAttribute('window-height', '480');
            gameWindowContainer.setAttribute('window-width', '621');
            gameIfame.src = 'https://www.freecell.io/game-frame/game/solitaire-windows-xp/';
            gameIfame.style.transform = 'scale(1.1)';
        } else if (game === 'minesweeper') {
            gameWindowContainer.setAttribute('window-name', "Minesweeper");
            gameWindowContainer.setAttribute('window-height', '412');
            gameWindowContainer.setAttribute('window-width', '600');
            // gameIfame.src = 'http://www.chezpoor.com/minesweeper/minecore.html';
            // gameIfame.src = 'https://nickarocho.github.io/minesweeper/';
            gameIfame.src = 'http://iconcept.bg/games/minesweeper';
            gameIfame.style.marginLeft = '10px';
            gameIfame.style.marginTop = '-100px';
            gameIfame.style.height = '500px';
            gameIfame.style.transform = 'scale(1.04)'
            gameIfame.scrolling = 'no';
        } else {
            gameWindowContainer.setAttribute('window-name', "Game");
            gameWindowContainer.setAttribute('window-height', '550');
            gameWindowContainer.setAttribute('window-width', '400');
            gameIfame.src = 'https://freepacman.org/';
        }

        gameWindowContainer.shadowRoot.getElementById('mydivbody').appendChild(gameIframeContainer);
        gameIframeContainer.appendChild(gameIfame);

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(gameWindowContainer);
    }

    static get observedAttributes() {
        return ['game'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'game' && oldValue !== newValue) {
            this.updateGame();
        }
    }
}

if ('customElements' in window) {
    customElements.define('web95-window', Web95Window);
    customElements.define('web95-button', Web95Button);
    customElements.define('web95-website', Web95Website);
    customElements.define('web95-shortcut', Web95Shortcut);
    customElements.define('web95-email', Web95Email);
    customElements.define('web95-taskbar', Web95Taskbar);
    customElements.define('web95-game', Web95Game);
}


// minesweeper:
// https://nickarocho.github.io/minesweeper/
// https://iconcept.bg/games/minesweeper/