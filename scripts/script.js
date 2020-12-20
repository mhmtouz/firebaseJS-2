const makaleler=document.querySelector('.guides');
const cikisLink=document.querySelectorAll('.logged-out');
const girisLink=document.querySelectorAll('.logged-in');
const uyelikDetay=document.querySelector('.account-details');

const userYukle=(kullanici)=>{
    if(kullanici){
        db.collection('kullanicilar').doc(kullanici.uid).get().then((doc=>{
            let html=`
            <div>Kullanıcı Ad-Soyad: <b>${doc.data().name}</b></div>
            <div>Kullanıcı Mail: <b>${kullanici.email}</b></div>
        `;
        uyelikDetay.innerHTML=html;
        }));
        
        
        girisLink.forEach(item=>item.style.display='block');
        cikisLink.forEach(item=>item.style.display='none');
    }else{        
        uyelikDetay.innerHTML='';
        girisLink.forEach(item=>item.style.display='none');
        cikisLink.forEach(item=>item.style.display='block');
    }
}

const makaleYukle=(data)=>{
    if (data.length){
        let html='';
        data.forEach(doc=>{
            const makale=doc.data();
            const li=`
           <li>
                <div class="collapsible-header grey lighten-4">${makale.baslik}</div>
                <div class="collapsible-body white"><span>${makale.icerik}</span></div>
           </li>
           `;html+=li;
        });
        makaleler.innerHTML=html;
    }else{
        makaleler.innerHTML='<h5 class="center-align">Makaleleri görebilmek için giriş yapınız..</h5>';
    }
}

document.addEventListener("DOMContentLoaded",function(){
    var modallar = document.querySelectorAll(".modal");
    M.Modal.init(modallar);

    var makaleler=document.querySelectorAll(".collapsible");
    M.Collapsible.init(makaleler)
})

