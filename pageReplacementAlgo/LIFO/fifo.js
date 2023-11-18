class lifo{
    constructor(capacity){
        this.capacity=capacity;
        this.pageFaults=0;
        this.pageHits=0;
        this.searchIndex=-1;
        this.frames=[];   
    }
    refer(token){
        this.searchIndex=this.frames.indexOf(token);
        if(this.searchIndex!=-1){
            this.pageHits++;
        }
        else{
            this.pageFaults++;
            if(this.capacity==this.frames.length){
                this.frames.pop();
            }
            this.frames.push(token);
        }
    }
}
document.getElementById("submit-btn").addEventListener("click",FIFO);
function FIFO(){
    let res = document.getElementById("refstr").value.split(" ");
    let frames = document.getElementById("frames").value;
    console.log(document.getElementById("frames"))
    let ref=[];
    for (let i = 0; i < res.length; i++) {
        if (res[i] != " " && res[i] != "") {
            ref.push(res[i]);
        }
    }
    createTable("table",frames,ref);
    let obj = new lifo(frames);
    for(let i=0;i<ref.length;i++){
        obj.refer(ref[i]);
        fillcol("table",i+1,obj.frames,frames,obj.searchIndex);
    }
    summary(obj.pageFaults,obj.pageFaults+obj.pageHits,frames);
}
function fillcol(tablename,col,objframes,n,searchindex){
    for(let i=1;i<=objframes.length;i++){
        let cell=document.getElementById(tablename+i+''+col);
        cell.innerHTML=objframes[i-1];  
    }
    n++;
    let cell=document.getElementById(tablename+n+''+col);
    if(searchindex==-1)cell.innerHTML="MISS";
    else{
        // console.log(tablename+n+''+col); 
        cell.innerHTML="HIT";
        document.getElementById(tablename+(searchindex+1)+''+col).classList.add("bg-success","text-white");
    }
}
function createTable(tablename,frames,ref){
    document.getElementById(tablename).innerHTML="";
    let table = '<tr><td id="'+tablename+'00" style="font-weight:bolder;">Reference</td>';
    for (let i = 0; i < ref.length; i++) {
        table += '<td style="font-weight:bolder;" id="'+tablename+'0'+(i+1) + '">' + ref[i] + "</td>";
    }
    table += "</tr>";
    table+= "<!--success-->";
    for (let i = 0; i < frames; i++) {
        table += '<tr><td style="font-weight:bolder;"id="' +tablename+ (i + 1) + '0">Frame ' + (i + 1) + "</td>";
        for (let j = 0; j < ref.length; j++) {
            table += '<td id="'+tablename + (i + 1) + (j + 1) + '"></td>';
        }
        table += "</tr>";
    }
    frames++;
    table += '<tr><td style="font-weight:bolder;"id="' +tablename+ frames + '0">Status</td>';
    for (var j = 1; j <= ref.length; j++) {
        table += '<td id="' +tablename+ frames + j + '"></td>';
    }
    table += "</tr>";
    console.log(table);
    document.getElementById(tablename).innerHTML += table;
}

function summary(pagefaults,pages,frames){
    let missratio=(pagefaults / pages).toPrecision(2);
    let hitratio=(1-missratio).toPrecision(2);
    document.getElementById('pages').innerText = pages;
    document.getElementById('frame').innerText = frames;
    document.getElementById('hits').innerText = pages-pagefaults;
    document.getElementById('faults').innerText = pagefaults;
    document.getElementById('hitr').innerText = hitratio;
    document.getElementById('missr').innerText = missratio;
}

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        document.getElementsByClassName('navbar')[0].classList.add('animate__slideOutUp');
        setTimeout(() => {
            document.getElementsByClassName('navbar')[0].style.display = 'none';

            document.getElementsByClassName('navbar')[0].classList.remove('animate__slideOutUp');
        }, 100);
    }
    else {
        if (document.getElementsByClassName('navbar')[0].style.display === 'none') {
            document.getElementsByClassName('navbar')[0].classList.add('animate__slideInDown');
            setTimeout(() => {
                document.getElementsByClassName('navbar')[0].style.display = 'block';
            }, 50);
            setTimeout(() => {
                document.getElementsByClassName('navbar')[0].classList.remove('animate__slideInDown');
            }, 500);
        }

    }
});