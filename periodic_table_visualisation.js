// We call the json file
const requestURL = "data/people.json";

const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  people = request.response;
  CreateElements(people);
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/1/clear");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/2/clear");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/3/clear");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/4/clear");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/5/clear");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/6/clips/1/connect");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clear");
};

// --------------------------------------------------------------------------- SCREEN PERIODIC TABLE
// Variables of the buttons to clasify the periodic table
var periodic_table = document.getElementById("periodic_table");
var SD_button = document.getElementById("SD_button");
var CD_button = document.getElementById("CD_button");
var ID_button = document.getElementById("ID_button");
var MD_button = document.getElementById("MD_button");

// Constant width and height of the elements in the table
var widthElement = "230px";
var heightElement = "300px";

// We create variables to do the rows and columns of the periodic table
var people;
var row = 0;
var element_counter = 0;

// We create the elements of the table based in the json data
function CreateElements(json) {
  lenghtProjects = json["people"].length;

  initalPos = "calc((100% - " + widthElement +  " * 11)/2)";
  for (i = 0; i < lenghtProjects; i++) {
    if (i == 1) {
      let emptyContainer = document.createElement("div");
      emptyContainer.className = "empty";
      periodic_table.append(emptyContainer);

      emptyContainer.style.left = "calc(((125% - " + widthElement +  " * 11)/2) + " + element_counter + "*" + widthElement +  ")";
      emptyContainer.style.top = "calc(" + row + "*" + heightElement +  ")";

      element_counter += 8;
    } else if (i == 6) {
      let emptyContainer = document.createElement("div");
      emptyContainer.className = "empty";
      periodic_table.append(emptyContainer);

      emptyContainer.style.left = "calc(((125% - " + widthElement +  " * 11)/2) + " + element_counter + "*" + widthElement +  ")";
      emptyContainer.style.top = "calc(" + row + "*" + heightElement +  ")";

      element_counter += 5;
    } else if (i == 12) {
      let emptyContainer = document.createElement("div");
      emptyContainer.className = "empty";
      periodic_table.append(emptyContainer);

      emptyContainer.style.left =
        "calc(((125% - " + widthElement +  " * 11)/2) + " + element_counter + "*" + widthElement +  "em)";
      emptyContainer.style.top = "calc(" + row + "*" + heightElement +  ")";

      element_counter += 5;
    }

    // Create rows
    if (element_counter == 11) {
      row += 1;
      element_counter = 0;
    }

    let divContainer = document.createElement("div");
    divContainer.className =
      "check_element element " + json["people"][i]["major"];
    divContainer.id = i;
    divContainer.style.left =
      "calc(((125% - " + widthElement +  " * 11)/2) + " + element_counter + "*" + widthElement +  ")";
    divContainer.style.top =
      "calc(((100% - " + heightElement +  " * 6)/2) + " + row + "*" + heightElement +  ")";
    periodic_table.append(divContainer);

    element_counter += 1;

    divContainer.onclick = function (event) {
      targetClick = event.target;
      if (!targetClick.className.includes("check_element")) {
        targetClick = targetClick.parentElement;
        if (!targetClick.className.includes("check_element")) {
          targetClick = targetClick.parentElement;
          if (!targetClick.className.includes("check_element")) {
            targetClick = targetClick.parentElement;
          } else {
            OpenProfile(people, targetClick.id);
          }
        } else {
          OpenProfile(people, targetClick.id);
        }
      } else {
        OpenProfile(people, targetClick.id);
      }
    };

    let divTop = document.createElement("div");
    divTop.className = "top_content";
    divContainer.append(divTop);

    let pTop = document.createElement("p");
    if (i < 10) {
      pTop.innerHTML = "0" + (i + 1) + " - " + json["people"][i]["major"];
    } else {
      pTop.innerHTML = i + 1 + " - " + json["people"][i]["major"];
    }
    pTop.className = "subtext";
    divTop.append(pTop);

    let divCircle = document.createElement("div");
    divCircle.className = "major_circle";
    divTop.append(divCircle);

    let divMiddle = document.createElement("div");
    divMiddle.className = "middle_content";
    divContainer.append(divMiddle);

    let h2Middle = document.createElement("h2");
    h2Middle.className = "capital_letter";
    h2Middle.innerHTML = json["people"][i]["name"].charAt(0);
    divMiddle.append(h2Middle);

    let h3Middle = document.createElement("h3");
    if (json["people"][i]["surname"].includes("Szabo")) {
      h3Middle.innerHTML = "Sk";
    } else if (json["people"][i]["surname"].includes("Diego")) {
      h3Middle.innerHTML = "Pd";
    } else {
      h3Middle.innerHTML =
      json["people"][i]["surname"].charAt(0) +
      json["people"][i]["surname"].charAt(1);
    }
    divMiddle.append(h3Middle);

    let pBottom = document.createElement("p");
    pBottom.innerHTML =
      json["people"][i]["name"] + "<br>" + json["people"][i]["surname"];
    pBottom.className = "subtext";
    divContainer.append(pBottom);
  }
}

// --------------------------------------------------------------------------- SCREEN PROFILE
// We take the variables of all elements needed for screen 02
var screen02 = document.getElementById("screen02");
var person_name = document.getElementById("person_name");
var person_description = document.getElementById("person_description");
var person_tags = document.getElementById("person_tags");
var person_profile_picture = document.getElementById("person_profile_picture");
var image_project_01 = document.getElementById("image_project_01");
var title_project_01 = document.getElementById("title_project_01");
var subtitle_project_01 = document.getElementById("subtitle_project_01");
var label_project_01 = document.getElementById("label_project_01");
var image_project_02 = document.getElementById("image_project_02");
var title_project_02 = document.getElementById("title_project_02");
var subtitle_project_02 = document.getElementById("subtitle_project_02");
var label_project_02 = document.getElementById("label_project_02");
var image_project_03 = document.getElementById("image_project_03");
var title_project_03 = document.getElementById("title_project_03");
var subtitle_project_03 = document.getElementById("subtitle_project_03");
var label_project_03 = document.getElementById("label_project_03");
var person_major = document.getElementById("person_major");

var actualColor;

// We open the profile
function OpenProfile(json, id) {
  id_int = parseInt(id);
  var elements = document.getElementsByClassName("element");

  for (i = 0; i < elements.length; i++) {
    elements[i].classList.remove("main_element");
    elements[i].classList.remove("main_element_project");
    elements[i].classList.remove("main_element_next");
    elements[i].classList.remove("main_element_prev");
    elements[i].classList.remove("main_element_next_hide");
    elements[i].classList.remove("main_element_prev_hide");
    elements[i].style.opacity = "1";
  }

  for (i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "var(--black)";
    elements[i].style.opacity = "0";
    MD_button.classList.remove("active");
    SD_button.classList.remove("active");
    ID_button.classList.remove("active");
    CD_button.classList.remove("active");
  }

  if (id_int == 0) {
    elements[0].classList.add("main_element");
    elements[1].classList.add("main_element_next");
    elements[elements.length - 1].classList.add("main_element_prev");
  } else if (id_int == elements.length - 1) {
    elements[elements.length - 1].classList.add("main_element");
    elements[0].classList.add("main_element_next");
    elements[elements.length - 2].classList.add("main_element_prev");
  } else {
    elements[id_int].classList.add("main_element");
    elements[id_int + 1].classList.add("main_element_next");
    elements[id_int - 1].classList.add("main_element_prev");
  }

  screen02.style.opacity = 1;
  screen02.style.zIndex = 1;

  screen03.style.opacity = 0;
  screen03.style.zIndex = -1;

  // Uploading data
  person_name.innerHTML =
    json["people"][id]["name"] + "<br>" + json["people"][id]["surname"];
  person_description.innerHTML = json["people"][id]["personal_description"];
  person_profile_picture.style.backgroundImage =
    "url(" + json["people"][id]["profile_picture"] + ")";
  qr_linktree.src = json["people"][id]["qr_linktree"];

  person_tags.innerHTML = "";
  for (i = 0; i < json["people"][id]["tags"].length; i++) {
    let tag = document.createElement("div");
    tag.className = "tag dynamic_border secondary_typo";
    tag.innerHTML = json["people"][id]["tags"][i];
    person_tags.append(tag);
  }

  person_major.classList.remove("CD");
  person_major.classList.remove("MD");
  person_major.classList.remove("ID");
  person_major.classList.remove("SD");

  if (json["people"][id]["major"].includes("CD")) {
    person_major.innerHTML = "Communication Design";
    person_major.classList.add("CD");
  } else if (json["people"][id]["major"].includes("MD")) {
    person_major.innerHTML = "Media Design";
    person_major.classList.add("MD");
  } else if (json["people"][id]["major"].includes("ID")) {
    person_major.innerHTML = "Interaction Design";
    person_major.classList.add("ID");
  } else if (json["people"][id]["major"].includes("SD")) {
    person_major.innerHTML = "Sound Design";
    person_major.classList.add("SD");
  }

  image_project_01.style.backgroundImage =
    "url(" + json["people"][id]["project01_media"][0][0] + ")";
  title_project_01.textContent = json["people"][id]["project01_title"];
  title_project_01.classList.add("secondary_typo");
  subtitle_project_01.textContent = json["people"][id]["project01_subtitle"];
  if (json["people"][id]["project01_university_project"].includes("Yes")) {
    label_project_01.textContent = "University project";
  } else {
    label_project_01.textContent = "Private project";
  }
  image_project_02.style.backgroundImage =
    "url(" + json["people"][id]["project02_media"][0][0] + ")";
  title_project_02.textContent = json["people"][id]["project02_title"];
  title_project_02.classList.add("secondary_typo");
  subtitle_project_02.textContent = json["people"][id]["project02_subtitle"];
  if (json["people"][id]["project02_university_project"].includes("Yes")) {
    label_project_02.textContent = "University project";
  } else {
    label_project_02.textContent = "Private project";
  }
  image_project_03.style.backgroundImage =
    "url(" + json["people"][id]["project03_media"][0][0] + ")";
  title_project_03.textContent = json["people"][id]["project03_title"];
  title_project_03.classList.add("secondary_typo");
  subtitle_project_03.textContent = json["people"][id]["project03_subtitle"];
  if (json["people"][id]["project03_university_project"].includes("Yes")) {
    label_project_03.textContent = "University project";
  } else {
    label_project_03.textContent = "Private project";
  }

  // Action in resolume
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/1/clips/" + json["people"][id]["position_resolume"] + "/connect");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clear");

  UpdateDynamic(json, id);
}

// --------------------------------------------------------------------------- SCREEN PROJECT
var screen03 = document.getElementById("screen03");
var element_selected = 0;
var arrows_sliders_content = "<div class='arrows_slider'><img class='icon' id='prev_image' onclick='SliderPrev();' src='img/icons/icon_3.svg'><img id='next_image' onclick='SliderNext();' class='icon' src='img/icons/icon_4.svg'></div>";

function openProject(id) {
  screen02.style.zIndex = 0;

  screen03.style.opacity = 1;
  screen03.style.zIndex = 1;

  content_container.innerHTML = arrows_sliders_content;

  for (i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("main_element")) {
      element_selected = i;
    }
    if (elements[i].classList.contains("main_element_next")) {
      elements[i].classList.remove("main_element_next");
      elements[i].classList.add("main_element_next_hide");
    }
    if (elements[i].classList.contains("main_element_prev")) {
      elements[i].classList.remove("main_element_prev");
      elements[i].classList.add("main_element_prev_hide");
    }
  }

  // To able to take the correct data from the json we need to create the same function 3 times
  if (id == 1) {
    DataProject01(people, element_selected);
  } else if (id == 2) {
    DataProject02(people, element_selected);
  } else if (id == 3) {
    DataProject03(people, element_selected);
  }
}

var project_name_person = document.getElementById("project_name_person");
var content_container = document.getElementById("content_container");
var project_title = document.getElementById("project_title");
var project_subtitle = document.getElementById("project_subtitle");
var tags_project = document.getElementById("tags_project");
var project_description = document.getElementById("project_description");
var project_media = document.getElementById("project_media");
var project_contributors = document.getElementById("project_contributors");
var projects_university = document.getElementById("projects_university");
var prev_project = document.getElementById("prev_project");
var next_project = document.getElementById("next_project");

var string01 = ""; // Text for no contributors
var string02 = "This project was done outside of the master's program CMSI."; // Text for private project
var string03 = "This project was done in the master's program CMSI."; // Text for university project

// --------------------------------------------------------------------------- Project 01
function DataProject01(json, id) {
  content_container.innerHTML = arrows_sliders_content;

  if (json["people"][id]["project01_media"][0][1].includes("video")) {
    var iframe = document.createElement("iframe");
    iframe.src = json["people"][id]["project01_media"][0][0];
    iframe.width = "100%";
    iframe.height = "100%";
    content_container.append(iframe);
  } else {
    var img = document.createElement("div");
    img.classList.add("image_container");
    img.style.backgroundImage =
      "url(" + json["people"][id]["project01_media"][0][0] + ")";
    content_container.append(img);
  }

  project_media.innerHTML = "";

  if (json["people"][id]["project01_contributors"] != "") {
    project_contributors.innerHTML = json["people"][id]["project01_contributors"];
  } else {
    project_contributors.innerHTML = string01;
  }

  if (json["people"][id]["project01_university_project"] != "No") {
    projects_university.innerHTML = string03;
  } else {
    projects_university.innerHTML = string02;
  }

  // SIDE IMAGES
  for (i = 0 ; i < json["people"][id]["project01_media"].length ; i++) {
    if (json["people"][id]["project01_media"][i][1].includes("video")) {
      var img = document.createElement("div");
      img.classList.add("side_image");
      img.id = i;

      img.onclick = function(event) {
        for (i = 0 ; i < document.getElementsByClassName("side_image").length; i++) {
          document.getElementsByClassName("side_image")[i].classList.remove("dynamic_border");
          document.getElementsByClassName("side_image")[i].style.borderColor = "var(--white)";
        }
        event.target.classList.add("dynamic_border");

        content_container.innerHTML = arrows_sliders_content;

        var iframe = document.createElement("iframe");
        iframe.src = json["people"][id]["project01_media"][event.target.id][0];
        iframe.width = "100%";
        iframe.height = "100%";
        content_container.append(iframe);
        
        UpdateDynamic(json, id);
      };

      img.style.backgroundImage =
        "url(" + json["people"][id]["project01_media"][i][2] + ")";
        project_media.append(img);
        if (i == 0) {
          img.classList.add("dynamic_border");
        }
    } else {
      var img = document.createElement("div");
      img.classList.add("side_image");
      if (i == 0) {
        img.classList.add("dynamic_border");
      }
      img.onclick = function(event) {
        for (i = 0 ; i < document.getElementsByClassName("side_image").length; i++) {
          document.getElementsByClassName("side_image")[i].classList.remove("dynamic_border");
          document.getElementsByClassName("side_image")[i].style.borderColor = "var(--white)";
        }
        event.target.classList.add("dynamic_border");

        content_container.innerHTML = arrows_sliders_content;
        var img = document.createElement("div");
        img.classList.add("image_container");
        img.style.backgroundImage = event.target.style.backgroundImage;
        content_container.append(img);
        
        UpdateDynamic(json, id);
      };

      img.style.backgroundImage =
        "url(" + json["people"][id]["project01_media"][i][0] + ")";
        project_media.append(img);
    }
    
  }

  project_title.innerHTML = json["people"][id]["project01_title"];
  project_subtitle.innerHTML = json["people"][id]["project01_subtitle"];
  project_description.innerHTML = json["people"][id]["project01_description"];
  prev_project.style.backgroundImage = "url('" + json["people"][id]["project03_media"][0][0] + "')";
  prev_project.onclick = function(event) {
    DataProject03(json, id);
  }
  next_project.style.backgroundImage = "url('" + json["people"][id]["project02_media"][0][0] + "')";
  next_project.onclick = function(event) {
    DataProject02(json, id);
  }

  tags_project.innerHTML = "";
  for (i = 0; i < json["people"][id]["project01_tags"].length; i++) {
    let tag = document.createElement("div");
    tag.className = "tag dynamic_border secondary_typo";
    tag.innerHTML = json["people"][id]["project01_tags"][i];
    tags_project.append(tag);
  }
  
  
  UpdateDynamic(json, id);
}

// --------------------------------------------------------------------------- Project 02
function DataProject02(json, id) {
  content_container.innerHTML = arrows_sliders_content;

  if (json["people"][id]["project02_media"][0][1].includes("video")) {
    var iframe = document.createElement("iframe");
    iframe.src = json["people"][id]["project02_media"][0][0];
    iframe.width = "100%";
    iframe.height = "100%";
    content_container.append(iframe);
  } else {
    var img = document.createElement("div");
    img.classList.add("image_container");
    img.style.backgroundImage =
      "url(" + json["people"][id]["project02_media"][0][0] + ")";
    content_container.append(img);
  }

  project_media.innerHTML = "";

  if (json["people"][id]["project02_contributors"] != "") {
    project_contributors.innerHTML = json["people"][id]["project02_contributors"];
  } else {
    project_contributors.innerHTML = string01;
  }

  if (json["people"][id]["project02_university_project"] != "No") {
    projects_university.innerHTML = string03;
  } else {
    projects_university.innerHTML = string02;
  }

  // SIDE IMAGES
  for (i = 0 ; i < json["people"][id]["project02_media"].length ; i++) {
    if (json["people"][id]["project02_media"][i][1].includes("video")) {
      var img = document.createElement("div");
      img.classList.add("side_image");
      img.id = i;

      img.onclick = function(event) {
        for (i = 0 ; i < document.getElementsByClassName("side_image").length; i++) {
          document.getElementsByClassName("side_image")[i].classList.remove("dynamic_border");
          document.getElementsByClassName("side_image")[i].style.borderColor = "var(--white)";
        }
        event.target.classList.add("dynamic_border");

        content_container.innerHTML = arrows_sliders_content;

        var iframe = document.createElement("iframe");
        iframe.src = json["people"][id]["project02_media"][event.target.id][0];
        iframe.width = "100%";
        iframe.height = "100%";
        content_container.append(iframe);
        
        UpdateDynamic(json, id);
      };

      img.style.backgroundImage =
        "url(" + json["people"][id]["project02_media"][i][2] + ")";
        project_media.append(img);
        if (i == 0) {
          img.classList.add("dynamic_border");
        }
    } else {
      var img = document.createElement("div");
      img.classList.add("side_image");
      if (i == 0) {
        img.classList.add("dynamic_border");
      }
      img.onclick = function(event) {
        for (i = 0 ; i < document.getElementsByClassName("side_image").length; i++) {
          document.getElementsByClassName("side_image")[i].classList.remove("dynamic_border");
          document.getElementsByClassName("side_image")[i].style.borderColor = "var(--white)";
        }
        event.target.classList.add("dynamic_border");

        content_container.innerHTML = arrows_sliders_content;
        var img = document.createElement("div");
        img.classList.add("image_container");
        img.style.backgroundImage = event.target.style.backgroundImage;
        content_container.append(img);

        UpdateDynamic(json, id);
      };

      img.style.backgroundImage =
        "url(" + json["people"][id]["project02_media"][i][0] + ")";
        project_media.append(img);
    }
    
  }

  project_title.innerHTML = json["people"][id]["project02_title"];
  project_subtitle.innerHTML = json["people"][id]["project02_subtitle"];
  project_description.innerHTML = json["people"][id]["project02_description"];
  prev_project.style.backgroundImage = "url('" + json["people"][id]["project01_media"][0][0] + "')";
  prev_project.onclick = function(event) {
    DataProject01(json, id);
  }
  next_project.style.backgroundImage = "url('" + json["people"][id]["project03_media"][0][0] + "')";
  next_project.onclick = function(event) {
    DataProject03(json, id);
  }

  tags_project.innerHTML = "";
  for (i = 0; i < json["people"][id]["project02_tags"].length; i++) {
    let tag = document.createElement("div");
    tag.className = "tag dynamic_border secondary_typo";
    tag.innerHTML = json["people"][id]["project02_tags"][i];
    tags_project.append(tag);
  }

  
  UpdateDynamic(json, id);
}

// --------------------------------------------------------------------------- Project 03
function DataProject03(json, id) {
  content_container.innerHTML = arrows_sliders_content;

  if (json["people"][id]["project03_media"][0][1].includes("video")) {
    var iframe = document.createElement("iframe");
    iframe.src = json["people"][id]["project03_media"][0][0];
    iframe.width = "100%";
    iframe.height = "100%";
    content_container.append(iframe);
  } else {
    var img = document.createElement("div");
    img.classList.add("image_container");
    img.style.backgroundImage =
      "url(" + json["people"][id]["project03_media"][0][0] + ")";
    content_container.append(img);
  }

  project_media.innerHTML = "";

  if (json["people"][id]["project03_contributors"] != "") {
    project_contributors.innerHTML = json["people"][id]["project03_contributors"];
  } else {
    project_contributors.innerHTML = string01;
  }

  if (json["people"][id]["project03_university_project"] != "No") {
    projects_university.innerHTML = string03;
  } else {
    projects_university.innerHTML = string02;
  }

  // SIDE IMAGES
  for (i = 0 ; i < json["people"][id]["project03_media"].length ; i++) {
    if (json["people"][id]["project03_media"][i][1].includes("video")) {
      var img = document.createElement("div");
      img.classList.add("side_image");
      img.id = i;

      img.onclick = function(event) {
        for (i = 0 ; i < document.getElementsByClassName("side_image").length; i++) {
          document.getElementsByClassName("side_image")[i].classList.remove("dynamic_border");
          document.getElementsByClassName("side_image")[i].style.borderColor = "var(--white)";
        }
        event.target.classList.add("dynamic_border");

        content_container.innerHTML = arrows_sliders_content;

        var iframe = document.createElement("iframe");
        iframe.src = json["people"][id]["project03_media"][event.target.id][0];
        iframe.width = "100%";
        iframe.height = "100%";
        content_container.append(iframe);
        
        UpdateDynamic(json, id);
      };

      img.style.backgroundImage =
        "url(" + json["people"][id]["project03_media"][i][2] + ")";
        project_media.append(img);
        if (i == 0) {
          img.classList.add("dynamic_border");
        }

        
    } else {
      var img = document.createElement("div");
      img.classList.add("side_image");
      if (i == 0) {
        img.classList.add("dynamic_border");
      }
      img.onclick = function(event) {
        for (i = 0 ; i < document.getElementsByClassName("side_image").length; i++) {
          document.getElementsByClassName("side_image")[i].classList.remove("dynamic_border");
          document.getElementsByClassName("side_image")[i].style.borderColor = "var(--white)";
        }
        event.target.classList.add("dynamic_border");

        content_container.innerHTML = arrows_sliders_content;
        var img = document.createElement("div");
        img.classList.add("image_container");
        img.style.backgroundImage = event.target.style.backgroundImage;
        content_container.append(img);
        
        UpdateDynamic(json, id);
      };

      img.style.backgroundImage =
        "url(" + json["people"][id]["project03_media"][i][0] + ")";
        project_media.append(img);
    }
  }

  project_title.innerHTML = json["people"][id]["project03_title"];
  project_subtitle.innerHTML = json["people"][id]["project03_subtitle"];
  project_description.innerHTML = json["people"][id]["project03_description"];
  prev_project.style.backgroundImage = "url('" + json["people"][id]["project02_media"][0][0] + "')";
  prev_project.onclick = function(event) {
    DataProject02(json, id);
  }
  next_project.style.backgroundImage = "url('" + json["people"][id]["project01_media"][0][0] + "')";
  next_project.onclick = function(event) {
    DataProject01(json, id);
  }

  tags_project.innerHTML = "";
  for (i = 0; i < json["people"][id]["project03_tags"].length; i++) {
    let tag = document.createElement("div");
    tag.className = "tag dynamic_border secondary_typo";
    tag.innerHTML = json["people"][id]["project03_tags"][i];
    tags_project.append(tag);
  }

  
  UpdateDynamic(json, id);
}

// --------------------------------------------------------------------------- GENERAL FUNCTIONS
function UpdateDynamic(json, id) {
  // Adapting colors
  if (json["people"][id]["major"].includes("SD")) {
    actualColor = "var(--sd)";
  } else if (json["people"][id]["major"].includes("CD")) {
    actualColor = "var(--cd)";
  } else if (json["people"][id]["major"].includes("ID")) {
    actualColor = "var(--id)";
  } else if (json["people"][id]["major"].includes("MD")) {
    actualColor = "var(--md)";
  }

  var dynamic_border = document.getElementsByClassName("dynamic_border");
  for (i = 0; i < dynamic_border.length; i++) {
    dynamic_border[i].style.borderColor = actualColor;
  }

  var dynamic_color = document.getElementsByClassName("dynamic_color");
  for (i = 0; i < dynamic_color.length; i++) {
    dynamic_color[i].style.color = actualColor;
  }
}

function SliderNext() {
  json = request.response
  for (i = 0 ; i < json["people"].length ; i++) {
    var image_container = document.getElementsByClassName("image_container");
    var video_container = document.querySelectorAll("#content_container > iframe");
    if (image_container.length != 0) {
      var actualImage = image_container[0].style.backgroundImage;
      var sideImage = document.getElementsByClassName("side_image");
    }
    if (video_container.length != 0) {
      var actualImage = video_container[0].src;
      var sideImage = document.getElementsByClassName("side_image");
    }
    for (j = 0 ; j < json["people"][i]["project01_media"].length ; j++) {
      if (actualImage.includes(json["people"][i]["project01_media"][j][0])) {
        if (j == 2) {
          if (json["people"][i]["project01_media"][0][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project01_media"][0][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project01_media"][0][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[0].classList.add("dynamic_border");
          sideImage[0].style.borderColor = actualColor;
        } else {
          if (json["people"][i]["project01_media"][j+1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project01_media"][j+1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project01_media"][j+1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[j+1].classList.add("dynamic_border");
          sideImage[j+1].style.borderColor = actualColor;
        }
      }
    }
    for (j = 0 ; j < json["people"][i]["project02_media"].length ; j++) {
      if (actualImage.includes(json["people"][i]["project02_media"][j][0])) {
        if (j == 2) {
          if (json["people"][i]["project02_media"][0][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project02_media"][0][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project02_media"][0][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[0].classList.add("dynamic_border");
          sideImage[0].style.borderColor = actualColor;
        } else {
          if (json["people"][i]["project02_media"][j+1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project02_media"][j+1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project02_media"][j+1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[j+1].classList.add("dynamic_border");
          sideImage[j+1].style.borderColor = actualColor;
        }
      }
    }
    for (j = 0 ; j < json["people"][i]["project03_media"].length ; j++) {
      if (actualImage.includes(json["people"][i]["project03_media"][j][0])) {
        if (j == 2) {
          if (json["people"][i]["project03_media"][0][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project03_media"][0][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project03_media"][0][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[0].classList.add("dynamic_border");
          sideImage[0].style.borderColor = actualColor;
        } else {
          if (json["people"][i]["project03_media"][j+1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project03_media"][j+1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project03_media"][j+1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[j+1].classList.add("dynamic_border");
          sideImage[j+1].style.borderColor = actualColor;
        }
      }
    }
  }
}

function SliderPrev() {
  json = request.response
  for (i = 0 ; i < json["people"].length ; i++) {
    var image_container = document.getElementsByClassName("image_container");
    var video_container = document.querySelectorAll("#content_container > iframe");
    if (image_container.length != 0) {
      var actualImage = image_container[0].style.backgroundImage;
      var sideImage = document.getElementsByClassName("side_image");
    }
    if (video_container.length != 0) {
      var actualImage = video_container[0].src;
      var sideImage = document.getElementsByClassName("side_image");
    }
    for (j = 0 ; j < json["people"][i]["project01_media"].length ; j++) {
      if (actualImage.includes(json["people"][i]["project01_media"][j][0])) {
        if (j == 0) {
          if (json["people"][i]["project01_media"][sideImage.length - 1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project01_media"][sideImage.length - 1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project01_media"][sideImage.length - 1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[sideImage.length - 1].classList.add("dynamic_border");
          sideImage[sideImage.length - 1].style.borderColor = actualColor;
        } else {
          if (json["people"][i]["project01_media"][j-1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project01_media"][j-1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project01_media"][j-1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[j-1].classList.add("dynamic_border");
          sideImage[j-1].style.borderColor = actualColor;
        }
      }
    }
    for (j = 0 ; j < json["people"][i]["project02_media"].length ; j++) {
      if (actualImage.includes(json["people"][i]["project02_media"][j][0])) {
        if (j == 0) {
          if (json["people"][i]["project02_media"][sideImage.length - 1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project02_media"][sideImage.length - 1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project02_media"][sideImage.length - 1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[sideImage.length - 1].classList.add("dynamic_border");
          sideImage[sideImage.length - 1].style.borderColor = actualColor;
        } else {
          if (json["people"][i]["project02_media"][j-1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project02_media"][j-1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project02_media"][j-1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[j-1].classList.add("dynamic_border");
          sideImage[j-1].style.borderColor = actualColor;
        }
      }
    }
    for (j = 0 ; j < json["people"][i]["project03_media"].length ; j++) {
      if (actualImage.includes(json["people"][i]["project03_media"][j][0])) {
        if (j == 0) {
          if (json["people"][i]["project03_media"][sideImage.length - 1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project03_media"][sideImage.length - 1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project03_media"][sideImage.length - 1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[sideImage.length - 1].classList.add("dynamic_border");
          sideImage[sideImage.length - 1].style.borderColor = actualColor;
        } else {
          if (json["people"][i]["project03_media"][j-1][1].includes("video")) {
            content_container.innerHTML = arrows_sliders_content;
            var iframe = document.createElement("iframe");
            iframe.src = json["people"][i]["project03_media"][j-1][0];
            iframe.width = "100%";
            iframe.height = "100%";
            content_container.append(iframe);
          } else {
            content_container.innerHTML = arrows_sliders_content;
            var img = document.createElement("div");
            img.classList.add("image_container");
            img.style.backgroundImage =
              "url(" + json["people"][i]["project03_media"][j-1][0] + ")";
            content_container.append(img);
          }
          for (n = 0 ; n < sideImage.length ; n++) {
            sideImage[n].classList.remove("dynamic_border");
            sideImage[n].style.borderColor = "var(--white)";
          }
          sideImage[j-1].classList.add("dynamic_border");
          sideImage[j-1].style.borderColor = actualColor;
        }
      }
    }
  }
}

var screen04 = document.getElementById("screen04");

function OpenExplanation() {
  screen04.style.zIndex = 1;
  setTimeout(function () {
    screen04.style.opacity = 1;
  }, 150);
}

function CloseExplanation() {
  screen04.style.opacity = 0;
  setTimeout(function () {
    screen04.style.zIndex = -1;
  }, 150);
}

var screen05 = document.getElementById("screen05");

function OpenPT(id) {
  screen05.style.opacity = 0;
  setTimeout(function () {
    screen05.style.zIndex = -1;
  }, 150);
  BackPeriodTable();

  if (id == 1) {
    ClickCD();
    isCDOn = true;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/6/clear");
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/2/clips/1/connect");
  } else if (id == 2) {
    ClickMD();
    isMDOn = true;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/6/clear");
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/4/clips/1/connect");
  } else if (id == 3) {
    ClickSD();
    isSDOn = true;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/6/clear");
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/3/clips/1/connect");
  } else if (id == 4) {
    ClickID();
    isIDOn = true;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/6/clear");
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/5/clips/1/connect");
  } else {
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/6/clear");
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clips/1/connect");
  }
}

function openFabry() {
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clear");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/1/clips/1/connect");

  setTimeout(function () {
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clips/1/connect");
  }, 3000);
}

var isSDOn = false;

function ClickSD() {
  var SD_elements = document.getElementsByClassName("SD");

  if (SD_button.classList.contains("active")) {
    SD_button.classList.remove("active");
    for (i = 0; i < SD_elements.length; i++) {
      SD_elements[i].style.backgroundColor = "unset";
    }
  } else {
    SD_button.classList.add("active");
    for (i = 0; i < SD_elements.length; i++) {
      SD_elements[i].style.backgroundColor = "var(--sdOp)";
    }
  }

  if (isSDOn == true) {
    isSDOn = false;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/3/clear");
  } else {
    isSDOn = true;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/3/clips/1/connect");
  }

  checkIdleInside();
}

var isCDOn = false;

function ClickCD() {
  var CD_elements = document.getElementsByClassName("CD");

  if (CD_button.classList.contains("active")) {
    CD_button.classList.remove("active");
    for (i = 0; i < CD_elements.length; i++) {
      CD_elements[i].style.backgroundColor = "unset";
    }
  } else {
    CD_button.classList.add("active");
    for (i = 0; i < CD_elements.length; i++) {
      CD_elements[i].style.backgroundColor = "var(--cdOp)";
    }
  }
  
  if (isCDOn == true) {
    isCDOn = false;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/2/clear");
  } else {
    isCDOn = true;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/2/clips/1/connect");
  }

  checkIdleInside();
}

var isIDOn = false;

function ClickID() {
  var ID_elements = document.getElementsByClassName("ID");

  if (ID_button.classList.contains("active")) {
    ID_button.classList.remove("active");
    for (i = 0; i < ID_elements.length; i++) {
      ID_elements[i].style.backgroundColor = "unset";
    }
  } else {
    ID_button.classList.add("active");
    for (i = 0; i < ID_elements.length; i++) {
      ID_elements[i].style.backgroundColor = "var(--idOp)";
    }
  }
  
  if (isIDOn == true) {
    isIDOn = false;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/5/clear");
  } else {
    isIDOn = true;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/5/clips/1/connect");
  }

  checkIdleInside();
}

var isMDOn = false;

function ClickMD() {
  var MD_elements = document.getElementsByClassName("MD");

  if (MD_button.classList.contains("active")) {
    MD_button.classList.remove("active");
    for (i = 0; i < MD_elements.length; i++) {
      MD_elements[i].style.backgroundColor = "unset";
    }
  } else {
    MD_button.classList.add("active");
    for (i = 0; i < MD_elements.length; i++) {
      MD_elements[i].style.backgroundColor = "var(--mdOp)";
    }
  }
  
  if (isMDOn == true) {
    isMDOn = false;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/4/clear");
  } else {
    isMDOn = true;
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/4/clips/1/connect");
  }

  checkIdleInside();
}

// Timer back to idle
var timeToIdle = 60000;
var myTimeout = window.setTimeout(OpenIdle, timeToIdle);

window.onclick = function(){
  window.clearTimeout(myTimeout);
  myTimeout = window.setTimeout(OpenIdle, timeToIdle);
};

function OpenIdle() {
  BackPeriodTable();
  screen05.style.opacity = 1;

  for (i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = "var(--black)";
    elements[i].style.opacity = "0";
    MD_button.classList.remove("active");
    SD_button.classList.remove("active");
    ID_button.classList.remove("active");
    CD_button.classList.remove("active");
  }

  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clear");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/6/clips/1/connect");

  setTimeout(function () {
    screen05.style.zIndex = 3;
  }, 150);
}

// --------------------------------------------------------------------------- BACK FUNCTIONS
function BackProfile() {
  screen03.style.opacity = 0;
  screen03.style.zIndex = -1;
  screen02.style.opacity = 1;
  screen02.style.zIndex = 1;

  for (i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("main_element_next_hide")) {
      elements[i].classList.add("main_element_next");
      elements[i].classList.remove("main_element_next_hide");
    }
    if (elements[i].classList.contains("main_element_prev_hide")) {
      elements[i].classList.add("main_element_prev");
      elements[i].classList.remove("main_element_prev_hide");
    }
  }
}

var elements = document.getElementsByClassName("element");

function BackPeriodTable() {
  screen02.style.opacity = 0;
  screen02.style.zIndex = -1;
  screen03.style.opacity = 0;
  screen03.style.zIndex = -1;

  element_counter = 0;
  row = 0;

  for (i = 0; i < elements.length; i++) {
    elements[i].classList.remove("main_element");
    elements[i].classList.remove("main_element_project");
    elements[i].classList.remove("main_element_next");
    elements[i].classList.remove("main_element_prev");
    elements[i].classList.remove("main_element_next_hide");
    elements[i].classList.remove("main_element_prev_hide");
    elements[i].style.opacity = "1";
  }

  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clips/1/connect");
  SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/1/clear");
}

// --------------------------------------------------------------------------- RESOLUME
var port = "8080";
var address = "127.0.0.1"

function SendToResolume(url) {
  let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.send();
}

function checkIdleInside() {
  if (isCDOn == false && isMDOn == false && isSDOn == false && isIDOn == false) {
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clips/1/connect");
  } else {
    SendToResolume("http://" + address + ":" + port + "/api/v1/composition/layers/7/clear");
  }
}