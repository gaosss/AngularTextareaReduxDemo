import {Component, HostListener, Input, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from "../user.service";
import {ACTION_LOGIN, ACTION_LOGOUT} from "../store/actions/appActions";
import Popper from 'popper.js';
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {untilDestroyed} from "ngx-take-until-destroy";

interface Contact {
  key: number;
  name: string;
}

let  msgCount = 0;
const LCSSYELLOW = 'color:orange;font-size:15px;';
const DT_CONTACT = 'contact';
const DT_MSG = 'msg';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @Input() idKey = 0;
  @Input() options: Contact[] = [
    {key: 0, name: 'Mark'},
    {key: 1, name: 'Tony'},
    {key: 2, name: 'Jobs'},
    {key: 4, name: 'Evan'},
    {key: 5, name: 'Ting'},
    {key: 6, name: 'Tom'},
    {key: 7, name: 'Jerry'},
    {key: 8, name: 'Derek'},
    {key: 9, name: 'John'},
    {key: 10, name: 'Steven'},
  ];

  originalOptions: Contact[];
  selectedOptions: Contact[];
  userName = '';
  showCandidateList: boolean;
  view: any;
  popperWindow:any;
  popperRef: any;
  spanArray: string[];
  formattedHTMLContacts: string;
  searchControl = new FormControl();



  tempMessage = '';

  textInput: string;
  textInputs: string[];


  resizeIndicator: boolean;
  grabber: boolean;
  oldX: number;
  oldY: number;
  width: number;
  height: number;

  constructor(private user: UserService,
              private vcr: ViewContainerRef,
              private zone: NgZone) {

    this.textInputs = [];
    this.showCandidateList = false;
    this.originalOptions = [];
    this.spanArray =[];
    this.formattedHTMLContacts = '';
    this.selectedOptions = [];

    this.resizeIndicator = false;
    this.grabber = false;
    this.oldX = 0;
    this.oldY = 0;
    this.height = 200;
    this.width = 500;
  }

  ngOnInit() {
    this.originalOptions = [...this.options];
    this.userName = 'Select...';
    if (undefined !== this.idKey) {
      this.userName = this.options.find(ele => ele.key === this.idKey).name;
    }

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        untilDestroyed(this)
      )
      .subscribe(val => this.search(val));

  }

  submit() {
    var textDiv = document.getElementById('textArea');

    this.textInputs.push(textDiv.innerText);
    this.user.updateState({
      action: ACTION_LOGIN,
      payload: { users: this.textInputs }
    });
  }


  clear() {
    this.user.updateState({
      action: ACTION_LOGOUT,
      payload: {}
    });
  }


  onKeyup(evt: KeyboardEvent, dropdownTpl: TemplateRef<any>, origin: HTMLElement) {

    if (!this.showCandidateList && evt.key === '@') {
      this.showCandidateList = true;
      this.options = [...this.originalOptions];
      this.open(dropdownTpl, origin);
    }
  }

  onDelete(ele: HTMLDivElement, evt: any) {
    let regexp = /<span.*?>.*?<\/span>/gs;
    let aa: String ='';
    let str = ele.innerHTML;
    console.log(`[${++msgCount}---------->>>>>>.`);
    console.log('%c===DELETE--> html', LCSSYELLOW, str);
    let existedSpans = [...str.match(regexp)];
    console.log('%c matched array', LCSSYELLOW, str.match(regexp));
    console.log(`${msgCount}]<<<<<----------.`);

    let arrIndex: number[] = [];
    existedSpans.forEach((val, index) => {
      if(val !== this.spanArray[index] && -1 !== val.indexOf(DT_CONTACT)) {
        console.log('span index deleted, ', index);
        existedSpans.splice(index, 1);
        this.spanArray.splice(index, 1);
        this.formattedHTMLContacts = this.spanArray.join(' ');
      }
    })
  }


  onInput(ele: HTMLDivElement, evt: any) {
    const val = ele.innerHTML;
    let regexp = /<span.*?>.+?<\/span>/gs;
    let str = ele.innerHTML;
    if (this.showCandidateList) {
      this.search(this.getPartialName(ele.innerText));
    } else {
      let msg = str.split(regexp);
      msg = msg.filter(vl => vl.length > 0);
      if (msg.length > 0) {
        console.log('message not name is:', msg[msg.length - 1]);
        let tempText = msg[msg.length - 1];
        if (tempText[tempText.length - 1] === '@') {
          tempText = tempText.slice(0, tempText.length - 1);
        }
        console.log('temp msg:', tempText);
        this.tempMessage = tempText;
      }
    }
    console.log(`${msgCount}]<<<<<----------.`);
  }

  onUpdateSpans(ele: HTMLDivElement, evt: any) {

    let regexp = /<span.*?>.*?<\/span>/gs;
    let str = ele.innerHTML;
    console.log(`[${++msgCount}---------->>>>>>.`);
    console.log('%c===UPDATE--> html', LCSSYELLOW, str);
    this.spanArray = [...str.match(regexp)]
  }





  // onclick() {
  //   console.log('textinput is ' + this.textInput);
  //   this.textInput = 'hello world';
  // }

  search(value: string) {
    this.options = this.originalOptions.filter((option: Contact) =>
      option.name.toLowerCase().includes(value.toLowerCase()));
  }

  open(dropdownTpl: TemplateRef<any>, origin: HTMLElement) {
    this.view = this.vcr.createEmbeddedView(dropdownTpl);
    const dropdown = this.view.rootNodes[0];
    if (this.popperWindow) {
      document.body.removeChild(this.popperWindow);
      this.popperWindow = undefined;
    }

    this.popperWindow = document.body.appendChild(dropdown);
    dropdown.style.width = `${origin.offsetWidth}px`;

    this.zone.runOutsideAngular(() => {
      this.popperRef = new Popper(origin, dropdown, {
        removeOnDestroy: true
      });
    });
  }


  close() {
    this.showCandidateList = false;
    this.options = [];
    if (this.popperWindow) {
      document.body.removeChild(this.popperWindow);
      this.popperWindow = undefined;
    }
  }



  getPartialName(val: string) {
    const res = val.lastIndexOf('@');
    let newName = '';
    if (-1 !== res) {
      newName = val.substring(res + 1);
    }
    return newName;
  }

  isActive(option: Contact) {
    return true;
  }

  select(option) {
    if(this.tempMessage.length > 0) {
      this.formattedHTMLContacts += this.formatMessage(this.tempMessage)
      this.tempMessage = ''
    }
    this.selectedOptions.push(option);
    this.formattedHTMLContacts += this.formatNames(option);

    this.close();
  }

  formatMessage(msg: string) {
    return `<span data-type="${DT_MSG}" data-id="" style="color: black">${msg}</span>`
  }


  formatNames(contact: Contact) {
    let names = `<span data-type="${DT_CONTACT}" data-id="${contact.key}" style="border-radius: 10px;
                  color: white;
                  background-color: blueviolet;
                  padding-left: 3px;" >${contact.name}</span> `;
    return names;
  }

  ngOnDestroy(): void {
  }



  //==================================resize part======

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    console.log('onMouseMove + this.grabber = ' + this.grabber);
    if (!this.grabber) {
      return;
    }
    // this.resizer(event.clientX - this.oldX);
    this.resizer(this.oldX - event.clientX, this.oldY - event.clientY);

    this.oldX = event.clientX;

    this.oldY = event.clientY;

    console.log('this.oldX = ' + this.oldX + '  ,  this.oldY =  ' + this.oldY);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    console.log('onMouseUp');
    this.resizeIndicator = false;
    this.grabber = false;
  }

  resizer(offsetX: number, offsetY: number) {
    if (this.resizeIndicator) {
      this.width -= offsetX;
      this.height -= offsetY;
    }
  }


  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    console.log('onMouseDown');
    this.grabber = true;
    this.oldX = event.clientX;
    this.oldY = event.clientY;
  }


  onMouseenter() {
    console.log('mouse enter');
    this.resizeIndicator = true;
  }

  onMouseleave() {
    console.log('mouse leave');
    //this.resizeIndicator = false;
  }



}
