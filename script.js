const menuButton=document.querySelector('.mobile-menu');
const nav=document.querySelector('.main-nav');
menuButton?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

const search=document.getElementById('gameSearch');
const filters=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.game-card')];
const noResults=document.getElementById('noResults');
let activeFilter='all';
function applyFilters(){
  const term=search.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const matchesCategory=activeFilter==='all'||card.dataset.category===activeFilter;
    const matchesText=card.dataset.name.includes(term)||card.dataset.category.includes(term);
    const show=matchesCategory&&matchesText;
    card.hidden=!show;
    if(show)visible++;
  });
  noResults.hidden=visible!==0;
}
filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  activeFilter=button.dataset.filter;
  applyFilters();
}));
search.addEventListener('input',applyFilters);
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
    event.preventDefault();search.focus();
  }
});
const dialog=document.getElementById('gameDialog');
document.querySelectorAll('.play-button').forEach(button=>button.addEventListener('click',()=>{
  document.getElementById('dialogTitle').textContent=button.dataset.game;
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('.dialog-ok').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
