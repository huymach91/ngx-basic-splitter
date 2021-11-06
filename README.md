# Ngx Splitter

angular 12.1.x.
[Buy Me a Coffee](https://www.buymeacoffee.com/huymax)

## Demo

[StackBlitz ⚡️](https://stackblitz.com/edit/ngx-basic-splitter)

## Installation

```bash
  npm install ngx-basic-splitter
```

## Usage

```javascript
<div class="horizontal">
  <div class="left"><div class="content">panel 1</div></div>
  <div ngx-basic-splitter [horizontalLeftWidth]="30" [handlerSize]="15"></div>
  <div class="right"><div class="content">panel 2</div></div>
</div>
```

```javascript
<div class="vertical">
  <div class="left"><div class="content">panel 1</div></div>
  <div
    ngx-basic-splitter
    [direction]="directionEnum.vertical"
    [verticalLeftHeight]="50"
  ></div>
  <div class="right"><div class="content">panel 2</div></div>
</div>

```

```javascript
<div class="nested">
  <div class="horizontal">
    <div class="left">
      <div class="content">panel 1</div>
    </div>
    <div ngx-basic-splitter [horizontalLeftWidth]="30"></div>
    <div class="right">
      <div class="ver-2">
        <div class="left">
          <div class="content">panel 2</div>
        </div>
        <div
          ngx-basic-splitter
          [direction]="directionEnum.vertical"
          [verticalLeftHeight]="20"
        ></div>
        <div class="right">
          <div class="hor-2">
            <div class="left">
              <div class="content">panel 3</div>
            </div>
            <div ngx-basic-splitter [horizontalLeftWidth]="30"></div>
            <div class="right">
              <div class="content">panel 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

```

## Screenshots

![App Screenshot](https://raw.githubusercontent.com/huymach91/ngx-splitter/master/src/assets/horizontal.png?token=AHXRERK2COYYL33OXQYESDDBQPANQ)

![App Screenshot](https://raw.githubusercontent.com/huymach91/ngx-splitter/master/src/assets/vertical.png?token=AHXRERMUH4N5ZQ3FAWCQHR3BQPAO2)

![App Screenshot](https://raw.githubusercontent.com/huymach91/ngx-splitter/master/src/assets/nested.png?token=AHXRERPNDGQQPE42UUHCXN3BQPASC)
