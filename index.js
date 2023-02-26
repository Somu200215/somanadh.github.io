var edit = false;
var editIndex = 0;
function prevent(e){
    e.preventDefault();
}
function OutTag(){
    setTimeout(()=>document.getElementById("hide").style.display="none",3000)
}
function ArticleForm(){
    let storedArticles = getArt()
    let form = document.getElementById('form');
    document.getElementById("hide").style.display="block";
    if(edit){
        storedArticles[editIndex].title = form['title'].value;
        storedArticles[editIndex].imgurl = form['imgurl'].value;
        storedArticles[editIndex].category = form['category'].value;
        storedArticles[editIndex].content = form['content'].value;
        setArticle(storedArticles)
        edit = false;
        displayArticles();
        form.reset();
        return;
    }
    if(form['category'].value =="null" || form['author'].value =="null"){
        document.getElementById('invalidmsg').style.display ='block';
        return;
    }
    document.getElementById('invalidmsg').style.display ='none';
    let article = {
        title:form['title'].value,
        imageurl:form['imgurl'].value,
        category:form['category'].value,
        author:form['author'].value,
        postdate:form['postdate'].value,
        content:form['content'].value
    }
    let arr = [article];
    arr = arr.concat(storedArticles);
    setArticle(arr);
    displayArticles();
    form.reset();
}
function getArt(){
    let articles =localStorage.getItem('article');
    return articles == null ? [] : JSON.parse(articles);
}
function setArticle(articles){
    localStorage.setItem('article',JSON.stringify(articles))
}
function createArticle(){
    document.getElementById('homeArticles').style.display = "none"
    document.getElementById("formdiv").style.display = "block";
    document.getElementById("articleListSection").style.display = "none";
    document.getElementById("selectedArticle").style.display = "none";
    let date = document.getElementById('postdate');
    date.min = getmindate();
}
function getmindate(){
    let date = new Date();
    let dateString = date.toISOString();
    return dateString.slice(0,10)
}
function displayArticles(value){
    document.getElementById('homeArticles').style.display = "none"
    document.getElementById("formdiv").style.display = "none";
    document.getElementById("aboutsec").style.display = "none";
    document.getElementById("articleListSection").style.display = "block";
    document.getElementById("selectedArticle").style.display = "none";
    let authorfilter = document.getElementById('authorfilter').value;
    let categoryfilter = document.getElementById('categoryfilter').value;
    let articletemplate = ``;
    let storedArticles = getArt();
    let articlelist = document.getElementById("articleList")
    if(categoryfilter != "null" && authorfilter !="null"){
        storedArticles = storedArticles.filter(x=>x.category ===categoryfilter && x.author === authorfilter);
    }else if(categoryfilter !="null"){
        storedArticles = storedArticles.filter(x=>x.category ===categoryfilter);
    }else if(authorfilter !="null"){
        storedArticles = storedArticles.filter(x=>x.author ===authorfilter);
    }
    if(storedArticles.length ===0){
        articlelist.innerHTML = '<h2>No article to display<h2>'
        return;
    }
   
    for(let index =0;index <storedArticles.length;index++){
        articletemplate += `<div  id="articleOnArticleList" class="articleOnArticleList">
                                <div id="articleListLeft" onclick="displaySelectedArticle('${storedArticles[index].title}')">
                                    <div id="articleListImageAndContent">
                                        <div id="articleimgdiv">
                                            <img src="${storedArticles[index].imageurl}" id="articleimage">
                                        </div>
                                        <div id="articleListContent">
                                            <h1 style='color:orange;'>${storedArticles[index].title}</h1>
                                            <h6>${storedArticles[index].category}</h6>
                                            <p id='description'>${storedArticles[index].content}</p>
                                        </div>
                                    </div>
                                    <div id="articleListFoot">
                                        <div>Published: ${storedArticles[index].postdate}</div>
                                        <div>Author: ${storedArticles[index].author}</div>
                                    </div>
                                </div>
                                <div id="articleListRight">
                                    <p onclick="editArticle('${storedArticles[index].title}')"><i class="fa-solid fa-pen-to-square"></i></p>
                                    <p onclick="deleteArticle('${storedArticles[index].title}')"><i class="fa-solid fa-trash-can"></i></p>
                                </div>
                            </div>`
    }
    articlelist.innerHTML = articletemplate;
}
function displayList(){
    let articles = document.getElementsByClassName("articleOnArticleList")
    for(let i=0;i<articles.length;i++){
        articles[i].style.width="100%";
    }
}
function displayGrid(){
    // document.getElementById("articleOnArticleList").style.width = "20%";
    let articles = document.getElementsByClassName("articleOnArticleList")
    for(let i=0;i<articles.length;i++){
        articles[i].style.width="20%";
    }

}
function displaySelectedArticle(title){
    document.getElementById('homeArticles').style.display = "none"
    document.getElementById("formdiv").style.display = "none";
    document.getElementById("articleListSection").style.display = "none";
    document.getElementById("selectedArticle").style.display = "block";
    let articles = getArt();
    let index = articles.findIndex(x=>x.title === title);
    let articleTemplate = `<h1 id="articleHeading">${articles[index].title}</h1>
                            <div id="articleListFoot">
                                <p id="selectedArticleDate">Posted On: ${articles[index].postdate}</p>
                                <p id="selectedArticleAuthor">Author: ${articles[index].author}</p>
                            </div>
                            <div id="selectedArticleImagediv">
                                <img src="${articles[index].imageurl}"  id="selectedArticleImage">
                            </div>
                            <p id="selectedArticleContent">${articles[index].content}</p>`
    document.getElementById('selectedArticle').innerHTML = articleTemplate;
}
function deleteArticle(title){
    let articles = getArt();
    let index = articles.findIndex(x=>x.title === title);
    articles.splice(index,1);
    setArticle(articles);
    displayArticles();
}
function aboutSec(){
    document.getElementById("aboutsec").style.display = "block";
    document.getElementById("formdiv").style.display = "none";
    document.getElementById("articleListSection").style.display = "none";
    document.getElementById("selectedArticle").style.display = "none";
    document.getElementById('homeArticles').style.display = "none"

}
function editArticle(title){
    document.getElementById("formdiv").style.display = "block";
    document.getElementById("articleListSection").style.display = "none";
    document.getElementById("selectedArticle").style.display = "none";
    let articles = getArt();
    let index = articles.findIndex(x=>x.title === title);
    let form = document.getElementById('form');
    form['title'].value=articles[index].title;
    form['imgurl'].value=articles[index].imgurl;
    form['category'].value=articles[index].category;
    form['author'].value=articles[index].author;
    form['postdate'].value=articles[index].postdate;
    form['content'].value=articles[index].content;
    document.getElementById('author').setAttribute("disabled","disabled");
    document.getElementById('postdate').setAttribute("disabled","disabled");
    edit = true;
    editIndex = index;
}
function articleView(){
    document.getElementById("formdiv").style.display = "none";
    document.getElementById("aboutsec").style.display = "none";
    document.getElementById("articleListSection").style.display = "none";
    document.getElementById("selectedArticle").style.display = "none";
    document.getElementById('homeArticles').style.display = "block"
    let template =``;
    let storedArticles = getArt();
    storedArticles = storedArticles.sort(function compare(obj1,obj2){
        return new Date(obj1.postdate) - new Date(obj2.postdate)
    });
    let final = [...storedArticles].reverse();
    for(let index=0;index<final.length;index++){
        if(index == 10){
            break;
        }
        template +=`<div  id="articleOnArticleList" class="articleOnArticleList"><div id="articleListLeft" onclick="displaySelectedArticle('${final[index].title}')"><div id="articleListImageAndContent"><div id="articleimgdiv"><img src="${final[index].imageurl}" id="articleimage"></div><div id="articleListContent"><h1 style='color:orange;'>${final[index].title}</h1><h6>${final[index].category}</h6><p id='description'>${final[index].content}</p></div> </div><div id="articleListFoot"><div>Published: ${final[index].postdate}</div><div>Author: ${final[index].author}</div></div> </div> </div>`
    }
    document.getElementById('homeArticles').innerHTML = template;
}