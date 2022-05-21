/*Instructions for adding a new publication data:
Journal:
    title: Add the correct title.
    authors: Add authors in correct order (array). While adding names make sure that only family name is complete and given name is in initials format. 
            Ensure space between initials. For example, "Aditya Kumar Prakash" = "A. K. Prakash"
    journal: Journal Name
    volume: volume of journal.
    pages: pages in the journal in the format, startingpage-endingpage. For examples, 20-30 (string)
    year: Year of publication (number)
    DOI: URL
    related_blog: title: Title should contain 5 words at max and if longer use ellipsis after this.
                  url: Link to blog.
    NOTE: use empty string for fields which are not given. If volume is not given, then define `volume: ""`

    Template:
    {
        title: "",
        authors: [""],
        journal: "",
        volume: "",
        number: "",
        pages: "",
        year: 2022,
        DOI: "",
        related_blog: {title: "",
                        url: ""}
    }
 */

const publication_data = {
    Journal: [{
        title: "Dynamic velocity error based trajectory tracking for space robotic manipulator",
        authors: ["A. Prakash", "D. K. Giri", "S. R. Kumar"],
        journal: "Aerospace Science and Technology",
        volume: "",
        number: "",
        pages: "",
        year: 2021,
        DOI: "https://doi.org/10.1016/j.ast.2022.107650",
        related_blog: {
            title: "",
            url: ""
        }
    }],
    Conference: []
}

function create_element(data_, main_) {
    /*
    data_: each publication data
    main_: for journal page or research page, true indicates for journal page
    */
    var authors = "";
    data_.authors.forEach((author, index) => {
        if (author == "A. Prakash")
            authors += "<em>A. Prakash</em>"
        else
            authors += author

        authors += ", "
    });

    var styling_;
    if (main_)
        styling_ = "class = 'pub-box'"
    else
        styling_ = "style='margin: 0px 0px 20px'"

    var main_string = `<div ${styling_}>${authors}<strong>${data_.title}</strong>
    , ${data_.journal} ${data_.volume} (${data_.year}) ${data_.pages}<br/> DOI: <a href="${data_.DOI}" target="_blank">${data_.DOI}</a></div>`
    if (data_.related_blog.title != "") {
        main_string = `<div ${styling_}>${authors}<strong>${data_.title}</strong>
        , ${data_.journal} ${data_.volume} (${data_.year}) ${data_.pages}<br/> DOI: <a href="${data_.DOI}" target="_blank">${data_.DOI}</a> <br/> Related Blog: <a href="${data_.related_blog.url}" target="_blank">${data_.related_blog.title}</a></div>`
    }
    return main_string;
}

function research_pub_element() {
    var all_data = [...publication_data["Journal"], ...publication_data['Conference']];
    all_data.sort((a, b) => b.year - a.year);
    all_data = all_data.slice(0, 5);
    var main_string = "";
    all_data.forEach((element) => {
        main_string += create_element(element, false);
    })
    var research_pub_area = document.getElementById("research-pub-area");
    research_pub_area.innerHTML = main_string;
}

function publication_element() {
    var journal_box = document.getElementById("journal_box");
    var journal_string = "";
    publication_data['Journal'].forEach(element => {
        journal_string += create_element(element, true)
    })
    journal_box.innerHTML = journal_string;

    var conf_box = document.getElementById("conf_box");
    var conf_string = "";
    publication_data['Conference'].forEach(element => {
        conf_string += create_element(element, true)
    })
    conf_box.innerHTML = conf_string;
}