# mxm-newsletter

Based on [mxm-gulp](https://github.com/maxomedia/mxm-gulp)


Checklist for newsletters

- **Meta tags**
  - `<meta charset="utf-8">`
  - `<meta http-equiv="X-UA-Compatible" content="IE=edge">`
  - `<meta name="viewport" content="width=device-width, initial-scale=1">`
- The table attributes `<table cellpadding="0" cellspacing="0">` can be replaced by this CSS:
  ```css
  table {
    border-spacing: 0;
    border-collapse: collapse;
    table-layout: fixed;
    padding: 0;
  }
  td {
    padding: 0;
  }
  ```

- **Padding** works on `<td>`, use this instead of spacer images
- A responsive centered **container** can be achieved by this minimal markup (don't forget cellpadding/spacing and font styles). This is recommendet over using `<center>` because Windows 10 Mail does not support background colors on `<body>` or `<center>`:
  ```html
  <style>
    .container-wrapper {
      width: 100%;
      /* Mail background color... */
    }

    .container {
      width: 600px;
      margin: 0 auto;
      text-align: left; /* Counter the <center> tag */

      @media screen and (max-width: 600px) {
        width: 100% !important; /* Needs important, desktop width will be inline */
      }
    }
  </style>

  <table class="container-wrapper">
    <tr>
      <td align="center">
        <table class="container"">
          <tr>
            <td>
              <!-- content -->
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  ```

- A rock solid **button** consists of a `<td>` and an `<a>` tag. It features a button-wide click area and custom padding (except exact horizontal padding in Outlook 07/10/13):
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

- A **vertical spacer** can be achieved by using following markup with the line-height as spacer property:
  ```html
  <div style="line-height: 50px">&nbsp;</div>
  ```

- For **horizontal spacers** use an empty table with padding on the td:
  ```html
  <table>
    <tr>
      <td style="padding: 0 50px"></td>
    </tr>
  </table>
  ```

- Positive `margins` in *px* (not em -> outlook buggy) on `<h1> - <h6>` and `<p>` tags work. Margins on other block level elements (table, div, ...) are stripped in Outlook 07/10/13/16win.
- `@font-face` will probably work in the future on Gmail and not only on Apple related clients. Allthough, Outlook does not like custom fonts and defaults back to Times New Roman. Use the following conditional style to fix it:
  ```html
  <!--[if mso]>
    <style>
      body, table, p, a, span, h1, h2, h3, h4, h5, h6 /* any other tags */ { font-family: sans-serif !important; }
    </style>
  <![endif]-->
  ```

- Animated **gifs** can be used. In non supporting browsers, the initial frame will be displayed.
- **Background images** for Outlook are available through the Vector Markup Language (VML)
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

- Set a hidden **preview text**: the text shown in the inbox below or next to the subject line. This text is the first text occuring in the newsletter, make sure it's not "view as webpage" or "having trouble seeing this?".
- **Alt text**! A lot of people have images disabled. By defining alt text, they can still get the meaning out of the mail and it looks less shit.
- **NO ROWSPAN!**, use nested tables. This way, you can always add more rows without destroying your layout completely.
- **Outlook 120 DPI**, proper scaling (https://litmus.com/community/discussions/151-mystery-solved-dpi-scaling-in-outlook-2007-2013):
  ```html
    <html xmlns="http://www.w3.org/1999/xhtml"
     xmlns:v="urn:schemas-microsoft-com:vml"
     xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
    <!--[if gte mso 9]><xml>
     <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
     </o:OfficeDocumentSettings>
    </xml><![endif]-->
    </head>
  ```

Tested with [litmus.com](https://litmus.com)