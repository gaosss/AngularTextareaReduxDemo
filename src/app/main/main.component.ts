import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {ACTION_LOGIN, ACTION_LOGOUT} from '../store/actions/appActions';


const nameList = ['Tom', 'Jerry', 'Mike', 'John', 'Tony', 'Cathy',
  'Jim', 'Oliver', 'Jack', 'Charlie', 'Harry', 'Jacob', 'George', 'Noah', 'Alfie', 'Oscar', 'James'];


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {


  indicatorForDropdownlist: boolean;
  postionForAt: number;
  nameListFordisplay: string[];
  nameSelected: string;
  objDiv: HTMLElement;


  textInputs: string[];


  resizeIndicator: boolean;
  grabber: boolean;
  oldX: number;
  oldY: number;
  width: number;
  height: number;
  userInput: string;

  constructor(private user: UserService) {
    this.indicatorForDropdownlist = false;
    this.textInputs = [];

    this.nameListFordisplay = new Array();
    for (let i = 0; i < nameList.length; i++) {
      this.nameListFordisplay[i] = nameList[i];
    }

    this.resizeIndicator = false;
    this.grabber = false;
    this.oldX = 0;
    this.oldY = 0;
    this.height = 200;
    this.width = 500;
  }

  ngOnInit() {


  }

  submit() {
    var textDiv = document.getElementById('myDiv');

    this.textInputs.push(textDiv.innerText);
    this.user.updateState({
      action: ACTION_LOGIN,
      payload: {users: this.textInputs}
    });
  }

  onClickOnDiv($event: any) {
    let element = ($event.target as HTMLElement);

    console.log('#####################---######################' + element);

    element.focus();
  }

  onKeyDelOrBackspace(event: any) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      let element = (event.target as HTMLElement);
      if (element.id === 'mySpan') {
        console.log('???event is???  ' + element.id);
        var myDiv = document.getElementById('myDiv');
        myDiv.removeChild(element);
      }

    }
  }

  onMouseDownSelectname(item: string) {
    console.log('onMouseDownSelectname' + item);
    var objNew = document.createElement('span');

    this.userInput = this.userInput + item;
    this.indicatorForDropdownlist = false;
    this.nameSelected = '@' + item + ' ';
    this.objDiv = document.getElementById('myDiv');
    var amountCut: number = this.objDiv.innerHTML.length - this.objDiv.innerHTML.lastIndexOf('@');
    this.objDiv.innerHTML = this.objDiv.innerHTML.substring(0, this.objDiv.innerHTML.length - amountCut);

    objNew.setAttribute('style', 'width:80px;z-index:9999; border:solid 1px red; position:relative;');
    objNew.setAttribute('contenteditable', 'false');
    objNew.id = 'mySpan';
    objNew.innerText = this.nameSelected;
    objNew.tabIndex = 0;

    this.objDiv.appendChild(objNew);


  }


  strAfterCompareWithNamelist(str: string): string[] {

    console.log('str input = ' + str);
    const tmpArray = [];

    if (str === '') {
      console.log('str is ' + str);
      return nameList;
    } else {

      for (let i = 0; i < nameList.length; i++) {
        if (nameList[i].toLowerCase().indexOf(str.toLowerCase()) !== -1) {
          tmpArray.push(nameList[i]);
        }
      }
      return tmpArray;
    }

  }

  onKeyup(event) {
    console.log('key up and this.userinput is ' + this.userInput);
    console.log('onkeyup event is ' + event);
    if (this.userInput) {
      const str = this.userInput.substring(this.userInput.length - 1);
      console.log('str just pressed is = ' + str);
      if (this.userInput && str === '@') {
        this.indicatorForDropdownlist = true;
        this.postionForAt = this.userInput.length;
      }
      const tmpData: string = this.userInput.substring(this.postionForAt);
      console.log('value after @ is ' + tmpData);

      this.nameListFordisplay = this.strAfterCompareWithNamelist(tmpData);

    }
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
