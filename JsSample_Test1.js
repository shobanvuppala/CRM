//Retrieve a GUID via REST (default the Price List field)
//In this example (intended for the Opportunity form’s Onload event) I execute a REST query to 
//retrieve the GUID of the Price List named “Wholesale Price List”.  I then execute the DefaultPriceList function to default the Price List field.
//As this uses REST your CRM form will need json2 and jquery libraries registered on the CRM form (I have these libraries in a solution 
//file I import when needed):


	
function RetrieveGUID() {
    // Get CRM Context
    var context = Xrm.Page.context;
    var serverUrl = context.getServerUrl();
    // Cater for URL differences between on-premise and online
    if (serverUrl.match(/\/$/)) {
        serverUrl = serverUrl.substring(0, serverUrl.length - 1);
    }
    // Define ODATA query
    var ODATA_ENDPOINT = "/XRMServices/2011/OrganizationData.svc";
    var ODATA_EntityCollection = "/PriceLevelSet";
    var PriceListName = 'Wholesale Price List';
    var QUERY = "?$select=PriceLevelId&$filter=Name%20eq%20'" + PriceListName + "'&$top=1";
    var URL = serverUrl + ODATA_ENDPOINT + ODATA_EntityCollection + QUERY;
    //Asynchronous AJAX call
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        url: URL,
        beforeSend: function (XMLHttpRequest) {
            //Specifying this header ensures that the results will be returned as JSON.
            XMLHttpRequest.setRequestHeader("Accept", "application/json");
        },
        success: function (data, textStatus, XmlHttpRequest) {
            //This function will trigger asynchronously if the Retrieve was successful
            var GUID_Retrieved = data.d.results[0].PriceLevelId;
            DefaultPriceList(GUID_Retrieved, PriceListName);
        },
        error: function (XmlHttpRequest, textStatus, errorThrown) {
            //This function will trigger asynchronously if the Retrieve returned an error
            alert("ajax call failed");
        }
    });
}