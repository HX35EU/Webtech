$(document).ready(function () {
    let main = "html\\main.html";
    $("#content").load(main);

    $("a.menuButton").click(function (e) {
        e.preventDefault();

        let link = $(this).attr("href");
        $("#content").load(link);
        $(".active").removeClass("active");
        $(this).addClass("active");
    });

});

function submitManufacturer() {
    let form = $("#manufacturers");
    let err = false;

    form.submit(function f(event) {
        event.preventDefault();
    });

    let post_url = "https://webtechcars.herokuapp.com/api/manufacturers";
    let form_data = form.serializeArray();
    let data = {};
    $.each(form_data, function (key, value) {
        if(value.value == ""){
            alert("Minden mező kitöltése közelező!");
            err = true;
            return false;
        }
        data[value.name] = value.value;
        console.log(data);
    });

    if(err)
        return;

    data.founded = formatData(data.founded);

    $.ajax({
        type: "POST",
        url: post_url,
        data: JSON.stringify(data),
        contentType: "application/json",
    });

    $("#content")
        .load($(".active")
            .attr("href"));
}

function submitCar() {
    let form = $("#cars");
    let err = false;

    form.submit(function f(event) {
        event.preventDefault();
    });

    let post_url = "https://webtechcars.herokuapp.com/api/cars";
    let form_data = form.serializeArray();
    let data = {};
    $.each(form_data, function (key, value) {
        data[value.name] = value.value;
        if(value.value == ""){
            alert("Minden mező kitöltése közelező!");
            err = true;
            return false;
        }
    });

    if(err)
        return;

    data.consumption += "l/100km";

    console.log(JSON.stringify(data));

    $.ajax({
        type: "POST",
        url: post_url,
        data: JSON.stringify(data),
        contentType: "application/json",
    })

    $("#content")
        .load($(".active")
            .attr("href"));
}

function loadManufacturers() {
    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        $.each(data, function (key, value) {
            $("#manufacturer")
                .append($('<option>')
                    .text(value.name)
                    .attr('value', value.name));
        });
    });
}

function deleteManufacturer(id, name) {

    if (!confirm('Are you sure you want to delete ' + name + '?')) {
       return;
    }

    let obj = {
        _id: id,
    };

    $.ajax({
        type: "DELETE",
        url: "https://webtechcars.herokuapp.com/api/manufacturers/" + id,
        data: JSON.stringify(obj),
        contentType: "application/json",
    }).done(()=>{
        $("#content")
            .load($(".active")
                .attr("href"));
    });
}

function deleteCar(id, name) {

    if (!confirm('Are you sure you want to delete ' + name + '?')) {
        return;
    }

    let obj = {
        _id: id,
    };

    $.ajax({
        type: "DELETE",
        url: "https://webtechcars.herokuapp.com/api/cars/" + id,
        data: JSON.stringify(obj),
        contentType: "application/json",
    }).done(()=>{
        $("#content")
            .load($(".active")
                .attr("href"));
    });
}

function formatData(value) {
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let retString = value.split("-");
    return months[parseInt(retString[1]) - 1] + " " + parseInt(retString[2]) + ", " + retString[0];
}