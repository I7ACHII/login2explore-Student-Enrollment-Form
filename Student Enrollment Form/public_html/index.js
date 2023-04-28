
var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBname = "SCHOOL-DB";
var empRelationName = "STUDENT-TABLE";
var connToken = "90932741|-31949278414628724|90950901";
$('#stuRollNo').focus();


function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getEmpIdAsJsonObj() {
    var stuRoll = $("#stuRollNo").val();
    var jsonStr = {
        rollno: stuRoll
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stuName").val(record.name);
    $("#stuClass").val(record.class);
    $("#stuBirthDate").val(record.birthdate);
    $("#stuAddress").val(record.address);
    $("#stuEnroll").val(record.enroll);
}

function resetData() {
    $("#stuRollNo").val("");
    $("#stuName").val("");
    $("#stuClass").val("");
    $("#stuBirthDate").val("");
    $("#stuAddress").val("");
    $("#stuEnroll").val("");
    $("#stuRollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#stuRollNo").focus();
}


function validateData() {
var sturollno, stuname, stuclass, stubirthdate, stuaddress, stuenroll;
        sturollno = $("#stuRollNo").val();
        stuname = $("#stuName").val();
        stuclass = $("#stuClass").val();
        stubirthdate = $("#stuBirthDate").val();
        stuaddress = $("#stuAddress").val();
        stuenroll = $("#stuEnroll").val();
        
        if (sturollno === "") {
            alert("Enter Student's Roll No");
            $("#stuRollNo").focus();
            return "";
        }
        if (stuname === "") {
            alert("Enter Student's Name");
            $("#stuName").focus();
            return "";
        }
        if (stuclass === "") {
                alert("Enter Student's Class");
                $("#stuClass").focus();
                return "";
        }        
        if (stubirthdate === "") {
            alert("Enter Student's Birth Date");
            $("#stuBirthDate").focus();
            return "";
        }
        if (stuaddress === "") {
            alert("Enter Student's Address");
            $("#stuAddress").focus();
            return "";
        }
        if (stuenroll === "") {
            alert("Enter Student's Enrollment No.");
            $("#stuEnroll").focus();
            return "";
        }

        var jsonStrObj = {
            rollno: sturollno,
            name: stuname,
            class: stuclass,
            birthdate: stubirthdate,
            address: stuaddress,
            enroll: stuenroll
        };
        return JSON.stringify(jsonStrObj);
}


function getStu() {
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBname, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,
            jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $('#stuName').focus();
    } else if (resJsonObj.status === 200) {
        $("#stuRollNo").prop("disabled", true);
        fillData(resJsonObj);

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $('#stuName').focus();
    }
}


function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return "";
    }
    var putReqStr = createPUTRequest(connToken,
            jsonStrObj, empDBname, empRelationName);
//        alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr,
            jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
//        alert(JSON.stringify(resJsonObj));
    resetData();
    $('#stuRollNo').focus();
}

function updateData() {
    $('#update').prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, empDBname, empRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,
            jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetData();
    $('#stuRollNo').focus();
}


