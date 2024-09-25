// Uses Zotero API to update my publications

function fetchData() {
    // Make a request to your API or data source
    fetch('https://api.zotero.org/users/8673209/publications/items')
      .then(response => response.json())
      .then(data => {
        // Update the website based on the received data
        data.forEach((x) => {addPublication(x.data)});
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  function formatCreatorDetails(creators) {
    const creatorNames = creators.map(creator => {
      return `${creator.firstName} ${creator.lastName}`;
    });
  
    return creatorNames.join(", ");
  }

  function camelCaseToSentenceCase(str) {
    str = str.replace(/([A-Z])/g, ' $1').trim();
    return str.charAt(0).toUpperCase() + str.slice(1); 
  }

  function applyLinkTag(value) {
    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)*$/;
  
    if (urlRegex.test(value)) {
      return `<a href="${value}">${value}</a>`;
    } else {
      return value;
    }
  }

  function getPubField(data){
    var finalString = ""
    for(const key in data){
        if(key !== 'key' && key !== 'version' && key !=='itemType' && key !== 'abstractNote' && key !== 'accessDate' && key !== "shortTitle"
     && key != "language" && key!== "callNumber" && key !== "libraryCatalog" && data[key] !== ""
        )
        {
            if(key == "creators"){
                finalString +=  "<p><strong>Author:</strong>" + `   ${formatCreatorDetails(data.creators)}`;
            }
            else if(key == "DOI" || key == "ISSN" || key == "ISBN"){
                finalString +=  `<p><strong>${key}:</strong> ${data[key]}`;
            }
            else
            {
                finalString += `<p><strong>${camelCaseToSentenceCase(key)}:</strong> ${applyLinkTag(data[key])}`
            }

        }
    }
    return finalString
  }

  function toggleDivVisibility(dataKey) {
    const divElement = dataKey
    if (divElement.style.display === "none") {
      divElement.style.display = "block";
    } else {
      divElement.style.display = "none";   
  
    }
  }

  function createPubElement(data){
    var publicationTitle = ""
    if(data['itemType']=='conferencePaper')
        {
            publicationTitle = data['conferenceName'];
        }
        else if(data['itemType'] == "journalArticle")
        {
            publicationTitle = data['publicationTitle']
        }
    var main_string = `<div "style='margin: 0px 0px 0px'"><a href="${data['url']}" style="text-decoration: none; color: inherit;" target="_blank"><strong>${data.title}</strong></a>
    , ${publicationTitle} (${data['date']})</div> <div style = "font-size: 15px; margin-top: 5px; margin-bottom: 5px; cursor: pointer;" onclick="toggleDivVisibility(${data.key})"><strong><u>Details</u> </strong></div> 
  <div style = "font-size: 14px; display: none;" id = "${data.key}">
    ${getPubField(data)}
</div><br/>`
    return main_string;
  }


  function addPublication(data) {
    var box = "";
    if(data['itemType']=='conferencePaper')
    {
        box = document.getElementById('conf_box');
    }
    else if(data['itemType'] == "journalArticle")
    {
        box = document.getElementById('journal_box');
    }
    else
    {
        box = document.getElementById('conf_box');
    }

    var box_string = box.innerHTML;
    box_string += createPubElement(data);
    box.innerHTML = box_string;
}
  fetchData();