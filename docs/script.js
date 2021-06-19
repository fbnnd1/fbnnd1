let str_filterActiveId = "all";

function toggleMenu(bol_toggle) {
    objButton = document.querySelector("#menu-button");

    if (bol_toggle) {
        if (objButton.dataset.menuActive == "false") {
             objButton.dataset.menuActive = "true";
             objButton.classList.add("button-menu-bar-active");
             document.querySelector(".button-menu-bar").classList.add("button-menu-bar-active");
        } else {
             objButton.dataset.menuActive = "false";
             objButton.classList.remove("button-menu-bar-active");
             document.querySelector(".button-menu-bar").classList.remove("button-menu-bar-active");
        }
    } else {
        objButton.dataset.menuActive = "false";
        objButton.classList.remove("button-menu-bar-active");
        document.querySelector(".button-menu-bar").classList.remove("button-menu-bar-active");
    }
}

 function getAllTechnologies() {
    
    arr_obj_projects_data.forEach(element => {

        element.technologies.forEach(element => {
            
            if (arr_technologies.includes(element) == false ) {
                arr_technologies.push(element);
            }
        });

    });

    arr_technologies.sort();
 }

function scrollFilterOptions(int_scroll) {
    const obj_html_list_filter = document.querySelector(".filter-list-options");
    let int_current_scroll = obj_html_list_filter.scrollLeft;

    //const int_max_scroll = 130 * (arr_technologies.length + 1);
    const int_max_scroll = obj_html_list_filter.clientWidth;

    int_current_scroll = int_current_scroll + int_scroll;

    if (int_current_scroll < 0) {
        obj_html_list_filter.scrollLeft = 0;
    } else if (int_current_scroll > int_max_scroll) {
        obj_html_list_filter.scrollLeft = int_max_scroll;
    } else {
        obj_html_list_filter.scrollLeft = int_current_scroll;
    }
}

function filterProjectsTechnology(str_technology) {
    const str_SelectedElementId = str_technology.replace(/\s/g, "_" );

    document.querySelector("#btn_filter_option_" + str_filterActiveId).classList.remove("active-filter");
    document.querySelector("#btn_filter_option_" + str_SelectedElementId).classList.add("active-filter");

    str_filterActiveId = str_SelectedElementId; 

    renderProjects(str_technology);
}

function renderFilterOptions() {

    getAllTechnologies();

    let str_html = "";
    arr_technologies.forEach((element) => {
        const str_id = element.replace(/\s/g, "_" );
        str_html += `<button onclick="filterProjectsTechnology(\'${element}\')" id="btn_filter_option_${str_id}">${element}</button>\n`;
    });

    const obj_html_filter = document.querySelector(".filter-list-options");
    obj_html_filter.innerHTML += str_html;
}

function renderProjects(str_technology) {
    let arr_obj_projects;

    if (str_technology == "all") {
        arr_obj_projects = arr_obj_projects_data;
    } else {
        arr_obj_projects = arr_obj_projects_data.filter((project) => {
            return project.technologies.includes(str_technology)
        });
    }

    let str_html = "";

    arr_obj_projects.forEach((element) => {

        var str_html_technologies = "";
        var str_html_btn_demo = "";

        element.technologies.forEach((element) => {
            str_html_technologies += `<li>${element};</li>`
        });

        str_html_technologies +=  ".";
        str_html_technologies = str_html_technologies.replace(";</li>.", ".</li>");

        if (element.url_demo) {
            str_html_btn_demo = `
            <a href="${element.url_demo}" target="_blank" class="demo-project-button">\n
                <span>Visitar Site</span>
            </a>\n`;
        }

        str_html += `
        <section class="project">\n
            <header>\n
                <h3>${element.project}</h3>\n
            </header>\n
            <div class="project-details">\n
                <figure>\n
                    <img src="imgs/projects/${element.logo}" alt="Projeto 1" />\n
                </figure>\n
                <div class="project-description">
                    <p>${element.description}.</p>\n
                    <p>Tecnologias:</p>\n
                    <ul>\n
                        ${str_html_technologies}\n
                    </ul>\n
                    <div class="project-buttons-wrapper">\n
                        <a href="${element.url}" target="_blank" class="github-project-button">\n
                            <i class="icofont-github" title="Github"></i> 
                            <span>Mais detalhes</span>
                        </a>\n
                        ${str_html_btn_demo}
                    </div>\n
                </div>
            </div>\n
        </section>\n`;
    });

    document.querySelector(".projects-container").innerHTML = str_html;   
}
