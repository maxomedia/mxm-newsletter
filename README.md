# mxm-newsletter

Based on [mxm-gulp](https://github.com/maxomedia/mxm-gulp)


Checklist for newsletters

- *Meta tags*
-- `<meta charset="utf-8">`
-- `<meta http-equiv="X-UA-Compatible" content="IE=edge">`
-- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<table>` attributes (use the `+table` mixin) should be on every table to avoid inexplicable padding/margin:
-- cellspacing="0"
-- cellpadding="0"
- *Padding* works on `<td>`, use this instead of spacer images
- A responsive centered *container* can be achieved by this minimal markup (don't forget cellpadding/spacing and font styles):
  ```html
  <style>
    .container {
      width: 600px;
      margin: 0 auto;
      text-align: left; // Counter the <center> tag

      @media screen and (max-width: 600px) {
        width: 100% !important; // Needs important, desktop width will be inline
      }
    }
  </style>

  <center>
    <table class="container"">
      <tr>
        <td>
          <!-- content -->
        </td>
      </tr>
    </table>
  </center>
  ```

- A rock solid *button* consists of a `<td>` and an `<a>` tag. It features a button-wide click area and custom padding (except exact horizontal padding in Outlook 07/10/13):
```html
  <style>
    .button {
      background: red;
      border-radius: 3px; // If any
    }

    .button a {
      display: inline-block;
      border: 1px solid red; // Border colored like the bg
      padding: 15px 30px;
      border-radius: 3px;
      background: red;
    }
  </style>
  <td class="button">
    <a href="https://google.ch">
      a new button
    </a>
  </td>
```

- A *vertical spacer* can be achieved by using following markup with the line-height as spacer property:
  ```html
  <div style="line-height: 50px">&nbsp;</div>
  ```

- For *horizontal spacers* use an empty table with padding on the td:
  ```html
  <table>
    <tr>
      <td style="padding: 0 50px"></td>
    </tr>
  </table>
  ```

- Positive `margins` in *px* (not em -> outlook buggy) on `<h1> - <h6>` and `<p>` tags work. Margins on other block level elements (table, div, ...) are stripped in Outlook 07/10/13/16win.
- `@font-face` will probably work in the future on Gmail and not only on Apple related clients.
- Animated *gifs* do work
- *Background images* for Outlook are available through the Vector Markup Language (VML)
  ```html
  <td style="background-image: url(http://placehold.it/600x300.jpg);width:600px;height:300px">
  <!--[if gte mso 9]>
    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px; height: 300px;">
      <v:fill type="frame" src="http://placehold.it/600x300.jpg" />
      <v:textbox inset="0,0,0,0">
        <![endif]-->
          <p>
            <!-- Some content -->
          </p>
        <!--[if gte mso 9]>
      </v:textbox>
    </v:rect>
  <![endif]-->
  ```

- Set a hidden *preview text*: the text shown in the inbox below or next to the subject line. This text is the first text occuring in the newsletter, make sure it's not "view as webpage" or "having trouble seeing this?".
- *Alt text*! A lot of people have images disabled. By defining alt text, they can still get the meaning out of the mail and it looks less shit.

Tested with [litmus.com](https://litmus.com)