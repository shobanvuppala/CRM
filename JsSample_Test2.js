// Main Function call 
function Form_OnLoad() {

    HidePhoneField();
    RequirementLevelForFax();
    Welcomemsg();
    DefaultFax();

}

// Will hide the phoe field on the form
function HidePhoneField() {
    Xrm.Page.getControl("telephone1").setVisible(false);
}

//Will make it required field 
function RequirementLevelForFax() {
    Xrm.Page.getAttribute("fax").setRequiredLevel("required")
}

// Welcome msg to account
function Welcomemsg() {
    var clientName = Xrm.Page.getAttribute("name").getValue();
    alert("Welcome to CRM - " + clientName)
}

// as its a required field its defaulted to the number 
function DefaultFax() {
    Xrm.Page.getAttribute("fax").setValue("1234567890");

}

