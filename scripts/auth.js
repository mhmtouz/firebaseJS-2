// AUTH DURUMU
auth.onAuthStateChanged(k => {
    if (k) {
        console.log("GİRİŞ BAŞARILI")
        // MAKALE VERİLERİ
        db.collection("makaleler").onSnapshot(snapshot => {
            makaleYukle(snapshot.docs)
            userYukle(k)
        })
    } else {
        console.log("ÇIKIŞ BAŞARILI")
    }
    makaleYukle([])
    userYukle()
});

// ÜYELİK OLUŞTUR
const uyelikForm = document.querySelector('#signup-form');
uyelikForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Başarılı")
    const name = uyelikForm['signup-name'].value;
    const mail = uyelikForm['signup-email'].value;
    const pass = uyelikForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(mail, pass).then(sonuc => {
        console.log(sonuc.user);

        return db.collection('kullanicilar').doc(sonuc.user.uid).set({
            name: name
        }).then(() => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            UyelikForm.reset();
        });
    });
});
//ÇIKIŞ
const cikis = document.querySelector('#logout');
cikis.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        //console.log("ÇIKIŞ BAŞARILI")
    });
});
//GİRİŞ
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mail = loginForm['login-email'].value;
    const pass = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(mail, pass).then((sonuc) => {
        console.log(sonuc.user);
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})
//MAKALE EKLE
const makaleForm = document.querySelector('#create-form');
makaleForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = makaleForm['title'].value;
    const content = makaleForm['content'].value;
    db.collection("makaleler").add({
        baslik: title,
        icerik: content
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        makaleForm.reset();
    }).catch(err => {
        console.log(err)
    })
});
