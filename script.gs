function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Custom Menu')
      .addItem('Show alert', 'showAlert')
      .addItem('file', 'openDialog')
      .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('modal-template');
  html.setWidth(300);
  html.setHeight(350);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, 'Dialog title');
}

function saveFile(e) {
  //var blob = Utilities.newBlob(e.bytes, e.mimeType, e.filename);
  var blob = Utilities.newBlob(e.bytes, e.mimeType, e.filename);
  var dir = DriveApp.getFolderById("1F8caVO1ggsK65vhLhshk_aWZezMzwjZJ"); // Get folder(file) with folder id
  
  const file = dir.createFile(blob) //create file
  const name = e.name
  var email = Session.getActiveUser().getEmail();
  const description = e.description
  file.setDescription(description)
  
  var row =  ["=ROW()-1",
              name,           //user input name 
              file.getName(),
              email,
              file.getDateCreated(),
              file.getLastUpdated(), 
              file.getMimeType(),
              file.getUrl(),
              file.getDownloadUrl(),
              //file.getAccess(),
              file.getDescription(),
              file.getViewers()
              ];

  var sheet = SpreadsheetApp.getActive().getSheetByName('profile')
  sheet.appendRow(row);

  const ui = SpreadsheetApp.getUi();
   ui.alert("done");

  //return "Done.";
}
