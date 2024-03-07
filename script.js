function change_value(id, value) {
    let input = document.getElementById(id);
    if (input.value == "") input.value = 0.5;
    let new_value = parseFloat(input.value) + value;
    if (new_value < 1 || new_value > 6) return;
    input.value = new_value;
}

function calculate_average() {
    let inputs = [
         document.getElementById("dt"), 
         document.getElementById("ma"), 
         document.getElementById("nt"),
         document.getElementById("rz"), 
         document.getElementById("en"),
         document.getElementById("fz"),
         document.getElementById("pb"),
         document.getElementById("wh"),
         document.getElementById("mi"),
         document.getElementById("mu"),
         document.getElementById("bs"), 
         document.getElementById("wp") 
    ];

    let values = {
        "dt": 0,
        "ma": 0,
        "nt": 0,
        "rz": 0,
        "en": 0,
        "fz": 0,
        "pb": 0,
        "wh": 0,
        "mi": 0,
        "mu": 0,
        "bs": 0,
        "wp": 0
    };

    let error_detected = false;

    inputs.forEach(input => {
        input.classList.remove("error");
        if (input.value == "" && input.id != "wp") {
            input.classList.add("error");
            error_detected = true;
        }
        else if (input.id != "wp") {
            let value = parseFloat(input.value);
            
            if (value < 1 || value > 6 || value % 0.5 != 0) {
                input.classList.add("error");
                error_detected = true;
            }
            else values[input.id] = value; 
        }
    });

    if (error_detected) return;


    let special_group_pwm = (values["pb"] + values["wh"] + values["mi"]) / 3;
    let special_group_mbw;
    if (values["wp"] == 0) special_group_mbw = (values["mu"] + values["bs"]) / 2;
    else special_group_mbw = (values["mu"] + values["bs"] + values["wp"]) / 3;

    special_group_pwm = Math.round(special_group_pwm * 10) / 10;
    special_group_mbw = Math.round(special_group_mbw * 10) / 10;

    console.log(special_group_pwm);
    console.log(special_group_mbw);

    let summ = values["dt"] * 2 + values["ma"] * 2 + values["nt"] * 2 + values["rz"] * 2 +
                values["en"] + values["fz"] + special_group_pwm + special_group_mbw;
                
    let durchschnitt = summ / 12;

    let solution = document.getElementById('solution')
    solution.innerHTML = 'Durchschnittsnote: ' + durchschnitt.toFixed(1);

    let school = document.getElementById("school");
    if (durchschnitt >= 4.7) 
        school.innerHTML = "Zu dir passt die Kanti und auch FMS/WMS/IMS und BM";
    else if (durchschnitt >= 4.4)
        school.innerHTML = "Zu dir passt die FMS/WMS/IMS und BM";
    else if (durchschnitt < 4.4)
        school.innerHTML = "Zu dir passt eien Lehere";

    solution.classList.add("active");
    school.classList.add("active");
    window.scrollTo(0, document.body.scrollHeight);
}

function empty_form() {
    let form = document.getElementById("grade-form");
    let school = document.getElementById("school");
    let solution = document.getElementById('solution');
    form.reset();
    school.innerHTML = ""
    school.classList.remove("active");
    solution.innerHTML = ""
    solution.classList.remove("active");
}
