/* Initialization parameters and params */
//background images list
var voteEmailKey="vote20191206pc"
var voteFuncContent = [
    {
        title:"Popular Regional Film",
        poster:[
            {"img":"img/prf/1c.png","name":"Hoichoi","title":"Cheeni"},
            {"img":"img/prf/2d2.png","name":"Disney+ Hotstar","title":"Drishyam 2"},
            {"img":"img/prf/3jb.png","name":"Prime Video","title":"Jai Bhim"},
            {"img":"img/prf/4k.png","name":"aha","title":"Krack"},
            {"img":"img/prf/5m.png","name":"Prime Video","title":"Malik"},
            {"img":"img/prf/6tgik.png","name":"Prime Video","title":"The Great India Kitchen"}
        ]
    },
    {
        title:"Popular International Film",
        poster:[
            {"img":"img/pif/1b-w.png","name":"Disney+ Hotstar","title":"Black Widow"},
            {"img":"img/pif/2f-g.png","name":"Disney+ Hotstar","title":"Free Guy"},
            {"img":"img/pif/3s-c.png","name":"Disney+ Hotstar","title":"Sangh-Chi"},
            {"img":"img/pif/4t.png","name":"Prime Video","title":"Tenet"},
            {"img":"img/pif/5w-om.png","name":"LionsGate Play","title":"Wrath of Man"},
            {"img":"img/pif/6js-jl.png","name":"Prime Video","title":"Justice League"}
        ]
    },
    {
        title:"Popular Regional Film",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/f6e29e4b49c8c65f69f10ab2f0d4d6c8/CUSoon-PrimeVideo.png","name":"Prime Video","title":"C U Soon"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/abcf0bbca885416308a1c385ba9e9b77/Darbar-PrimeVideo.png","name":"Prime Video","title":"Darbar"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/8490f7b8e8299510a7fb3a2f7688ec51/AnjaamPathiraa-SunNXT.png","name":"Sun NXT","title":"Anjaam Pathiraa"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/3199c8241e55328771b1ca2b82d1f90e/Johaar-Aha.png","name":"aha","title":"Johaar"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/532dc6a0fbf397e10e130a3c4818beae/Nagarkirtan-Hoichoi.png","name":"Hoichoi","title":"Nagarkirtan"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/3552936568ac286ad147fe06edc73d90/ColourPhoto-Aha.png","name":"aha","title":"Colour Photo"}
        ]
    },
    {
        title:"Popular TV Show in Hindi",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/285010243e8ca619d9a1d8b7dd72f15c/Mahabharat-Hotstar.png","name":"Disney+ Hotstar","title":"Mahabharat"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/fb02ecd6fbc1f717693afc46f705364d/KundaliBhagya-ZEE5.png","name":"ZEE5","title":"Kundali Bhagya"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/c5ef22a7e313699f319d3d3a50f33e7e/TaarakMehtaKaOoltahChashmah-SonyLIV.png","name":"SonyLIV","title":"Taarak Mehta Ka Ooltah Chashmah"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/bc96c3f308be88e59b4edcb6bf599477/KaunBanegaCrorepati-S12-SonyLIV.png","name":"SonyLIV","title":"Kaun Banega Crorepati Season 12"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/3985365d32972b04f2730b31861aced3/StoriesbyRabindranathTagore-EPICON.png","name":"EPIC ON","title":"Stories by Rabindranath Tagore"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/449ba2ae137489031fae1d03aeb7c35e/TheKapilSharmaShow-SonyLIV.png","name":"SonyLIV","title":"The Kapil Sharma Show"}
        ]
    },
    {
        title:"Popular TV Show in English",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/e652fdc5c1f86cc5d8d8169644db0b16/TheGoodDoctor-S3-SonyLIV.png","name":"SonyLIV","title":"The Good Doctor Season 3"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/0ce34b32c62f11cb7e8935ed118c987b/ModernFamily-S11-Hotstar.png","name":"Disney+ Hotstar","title":"Modern Family Season 11"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/39197c9cc4551002824a00b41bb9f716/ThisisUs-S5-PrimeVideo.png","name":"Prime Video","title":"This is Us Season 5"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/b6141e34d6b325f429387fe8cb085ced/WhoWantstobeaMillionaire-SonyLIV.png","name":"SonyLIV","title":"Who Wants to be a Millionaire"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/25733b7f88614c65e3b5ba62203cc0ce/Succession-S2-Hotstar.png","name":"Disney+ Hotstar","title":"Succession Season 2"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/4917559295fcf7abe279073e9edbabd6/Empire-S6-Hotstar.png","name":"Disney+ Hotstar","title":"Empire Season 6"}
        ]
    },
    {
        title:"Popular Regional TV Show",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/870ff6e4ac3fa09742e1cd52bfd22938/Chithi2-SunNXT.png","name":"Sun NXT","title":"Chithi 2"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/05d4e6ff548ce25b17dc3ad8925be0e4/AggaBaiSasubai-ZEE5.png","name":"ZEE5","title":"Agga Bai Sasubai"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/7a50f1b053d6165ebcd4896a04f31b36/Gattimela-ZEE5.png","name":"ZEE5","title":"Gattimela"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/49dddc5b710a91fba5debbaf198d58dd/BiggBoss4-Hotstar.png","name":"Disney+ Hotstar","title":"Bigg Boss 4"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/fc2140c889d3fd4e7477ed74d6f177d8/ChalaHawaYeuDya-ZEE5.png","name":"ZEE5","title":"Chala Hawa Yeu Dya"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/bc41f376725b26b83bfa983e680475b2/LakshmiStores-SunNXT.png","name":"Sun NXT","title":"Lakshmi Stores"}
        ]
    },
    {
        title:"Popular Original in Hindi",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/b0b86cc87fffb96685c48a1b4ab24822/Scam1992TheHarshadMehtaStory-SonyLIV.png","name":"SonyLIV","title":"Scam 1992: The Harshad Mehta Story"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/eb9aa0e1ac51aa6a2bfd2e75016c0dbb/Mirzapur-S2-PrimeVideo.png","name":"Prime Video","title":"Mirzapur Season 2"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/b7b40e01fdf962a90979b7f99356b811/FourMoreShotsPlease!-S2-PrimeVideo.png","name":"Prime Video","title":"Four More Shots Please! Season 2"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/313f15eea596155c8242d81021f1f628/PaatalLok-PrimeVideo.png","name":"Prime Video","title":"Paatal Lok"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/03f8422fb523c4f5fc94ffa5a127006a/Taish-ZEE5.png","name":"ZEE5","title":"Taish"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/23cc68978137eb848df6274af6ec3396/Aarya-Hotstar.png","name":"Disney+ Hotstar","title":"Aarya"}
        ]
    },
    {
        title:"Popular Original in English",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/d0466b970013eb83dc3f7ea06f01bc50/TheMandalorian-S2-Hotstar.png","name":"Disney+ Hotstar","title":"The Mandalorian Season 2"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/a8bda8e618e5c461d01ef1adfc90943a/TheBoys-S2-PrimeVideo.png","name":"Prime Video","title":"The Boys Season 2"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/308e5016ceddcc17ad3bfdeaeda6722b/TheTestTheNewEraofAustraliasTeam-PrimeVideo.png","name":"Prime Video","title":"The Test: The New Era of Australia's Team"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/33f20f0589db793b4abf7bece249bafa/TheMarvelousMrs.Maisel-S3-PrimeVideo.png","name":"Prime Video","title":"The Marvelous Mrs. Maisel Season 3"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/962dba5d007380a6a2b446bd03fbba9e/Westworld-S3-Hotstar.png","name":"Disney+ Hotstar","title":"Westworld Season 3"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/4c8a957325cbf8335bd24e4bf35ff3e3/IMayDestroyYou-S1-Hotstar.png","name":"Disney+ Hotstar","title":"I May Destroy You"}
        ]
    },
    {
        title:"Popular Regional Original",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/59ba773be95a50e1e6ae414c6d6ceb28/Loser-ZEE5.png","name":"ZEE5","title":"Loser"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/d2a4deab17af56e73f49b9e9a3ca9a2c/KothaPoradu-Aha.png","name":"aha","title":"Kotha Poradu"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/4c3800ca26ecb836fde1726d69e3eaba/Chadarangam-ZEE5.png","name":"ZEE5","title":"Chadarangam"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/1c4ec59a70b158269b3a46bcd20d2bcf/AmruthamDhvitheeyam-ZEE5.png","name":"ZEE5","title":"Amrutham Dhvitheeyam"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/674be5c5a3a99aece3b3a16d9fcc35d7/TansenerTanpura.png","name":"Hoichoi","title":"Tansener Tanpura"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/1c06988134450baa94ead0e3d289e94b/ShobdoJobdo-Hoichoi.png","name":"Hoichoi","title":"Shobdo Jobdo"}
        ]
    },
    {
        title:"Popular Documentary",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/a5cb6f4905082c880f43df6fb8c5a6f6/EyeToEyeWithEverestDeathOnAMountain-DocuBay.png","name":"DocuBay","title":"Eye To Eye With Everest:Death On A Mountain"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/9e52faacff513bb6e274e4356e6a42d2/AustraliaonFire-DocuBay.png","name":"DocuBay","title":"Australia on Fire"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/0887243edbbaecef675faf238d2bf991/ChasingHappiness-PrimeVideo.png","name":"Prime Video","title":"Chasing Happiness"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/818bc8c3c838b1023e9bce12ea92edfe/Hillary-SonyLIV.png","name":"SonyLIV","title":"Hillary"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/2e8335db09cc2d0c9cd4abd571b2af43/LockdownIndiaFightsCoronavirus-Hotstar.png","name":"Disney+ Hotstar","title":"Lockdown: India Fights Coronavirus"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/5e52e1b82fd948a60c41af786a1abd1f/EPICENTER24hoursinWuhan-DocuBay.png","name":"DocuBay","title":"EPICENTER: 24 hours in Wuhan"}
        ]
    },
    {
        title:"Popular Music Video",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/e630d09d6792db519df13fc2594b9576/DuniyaSharmaJaayegi-Zee5.png","name":"ZEE5","title":"Duniya Sharma Jaayegi"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/5c598ad57e1704344b8f441c2dbfbe8d/IllegalWeapon2.0-Hungama.png","name":"Hungama Play","title":"Illegal Weapon 2.0"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/e3e9cb0e9233829f58b88539208d49a5/DusBahane2.0-Hungama.png","name":"Hungama Play","title":"Dus Bahane 2.0"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/2e98dc505da651d299a900af64e241f1/PachtaogeFemaleVersion-Hungama.png","name":"Hungama Play","title":"Pachtaoge (Female Version)"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/4852d2804b3e742e5371d16c6022976e/Badshah-GendaPhool-Hungama.png","name":"Hungama Play","title":"Badshah - Genda Phool"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/672b089657feabd0ba894d65ccc04b31/DilBechara-TitleTrack-Hotstar.png","name":"Disney+ Hotstar","title":"Dil Bechara - Title Track"}
        ]
    },
    {
        title:"Popular LIVE News Channel",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/50654395b10259ff9afda78334b8cf4d/ABPHindi.png","name":"ABP Hindi","title":"ABP Hindi"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/9c7de0bcac5c77652f0100bb0b08bdb1/RepublicTV.png","name":"Republic TV","title":"Republic TV"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/6f12f37a0071469572255dd26d3d71c1/SunNews.png","name":"Sun News","title":"Sun News"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/06ccce641a19e5c6955065e994124699/ABPMajha.png","name":"ABP Majha","title":"ABP Majha"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/3104386d5d1b236ff2e767b8c908a043/ABPAsmita.png","name":"ABP Asmita","title":"ABP Asmita"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/9dcaf07c9a8f0bb883bf9e83f9add1e3/ABPAnanda.png","name":"ABP Ananda","title":"ABP Ananda"}
        ]
    },
    {
        title:"Popular Kids Content",
        poster:[
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/4ba2a7154d76c73ba74c3514202df1dc/FrozenII-Hotstar.png","name":"Disney+ Hotstar","title":"Frozen II"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/e4b753d0b477a563cd76f93b316fdc6b/BabyShark-PrimeVideo.png","name":"Prime Video","title":"Baby Shark"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/22d682866a65446d6ca399b39af5acff/Guddu-ZEE5.png","name":"ZEE5","title":"Guddu"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/ca70d9c7e01c13e2677a8f1fbfb33f9a/FunwithPhonics-Kutuki.png","name":"Kutuki","title":"Fun with Phonics"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/7eacf16cec255d2bcfb4a5c1229daf8b/ScoobHindi-Hungama.png","name":"Hungama Play","title":"Scoob (Hindi)"},
            {"img":"https://cdn.alsgp0.fds.api.mi-img.com/mitv/10007/2/b1ea2832b8ea7dd49bd6de2c684cd6f8/CoronaSeDaroNa-Kutuki.png","name":"Kutuki","title":"Corona Se Daro Na"}
        ]
    }
];
var TERM = "2";
var TAG="voteFunc";
var jumpout = false;//is close the html
var voteFuncResult = new Object();
var pageEntry = [];

// var pageFocusList = [
//     //page1
//     {id:0,domid:"",upto:"none",downto:6,leftto:"none",rightto:1,focusfunc:"showPicFocus(1,1)",unfocusfunc:"showPicFocus(1,1)",clickfunc:"voteFunc(1,1)", page:1},
//     {id:1,domid:"",upto:"none",downto:7,leftto:0,rightto:2,focusfunc:"showPicFocus(1,2)",unfocusfunc:"showPicFocus(1,2)",clickfunc:"voteFunc(1,2)", page:1},
//     {id:2,domid:"",upto:"none",downto:8,leftto:1,rightto:3,focusfunc:"showPicFocus(1,3)",unfocusfunc:"showPicFocus(1,3)",clickfunc:"voteFunc(1,3)", page:1},
//     {id:3,domid:"",upto:"none",downto:9,leftto:2,rightto:4,focusfunc:"showPicFocus(1,4)",unfocusfunc:"showPicFocus(1,4)",clickfunc:"voteFunc(1,4)", page:1},
//     {id:4,domid:"",upto:"none",downto:10,leftto:3,rightto:5,focusfunc:"showPicFocus(1,5)",unfocusfunc:"showPicFocus(1,5)",clickfunc:"voteFunc(1,5)", page:1},
//     {id:5,domid:"",upto:"none",downto:11,leftto:4,rightto:"none",focusfunc:"showPicFocus(1,6)",unfocusfunc:"showPicFocus(1,6)",clickfunc:"voteFunc(1,6)", page:1},
//     {id:6,domid:"",upto:0,downto:12,leftto:"none",rightto:"7",focusfunc:"showPicFocus(2,1)",unfocusfunc:"showPicFocus(2,1)",clickfunc:"voteFunc(2,1)", page:1},
//     {id:7,domid:"",upto:1,downto:13,leftto:"6",rightto:"8",focusfunc:"showPicFocus(2,2)",unfocusfunc:"showPicFocus(2,2)",clickfunc:"voteFunc(2,2)", page:1},
//     {id:8,domid:"",upto:2,downto:14,leftto:"7",rightto:"9",focusfunc:"showPicFocus(2,3)",unfocusfunc:"showPicFocus(2,3)",clickfunc:"voteFunc(2,3)", page:1},
//     {id:9,domid:"",upto:3,downto:15,leftto:"8",rightto:"10",focusfunc:"showPicFocus(2,4)",unfocusfunc:"showPicFocus(2,4)",clickfunc:"voteFunc(2,4)", page:1},
//     {id:10,domid:"",upto:4,downto:16,leftto:"9",rightto:"11",focusfunc:"showPicFocus(2,5)",unfocusfunc:"showPicFocus(2,5)",clickfunc:"voteFunc(2,5)", page:1},
//     {id:11,domid:"",upto:5,downto:17,leftto:"10",rightto:"none",focusfunc:"showPicFocus(2,6)",unfocusfunc:"showPicFocus(2,6)",clickfunc:"voteFunc(2,6)", page:1},
//     //page2
//     {id:12,domid:"",upto:"6",downto:18,leftto:"none",rightto:13,focusfunc:"showPicFocus(3,1)",unfocusfunc:"showPicFocus(3,1)",clickfunc:"voteFunc(3,1)", page:2},
//     {id:13,domid:"",upto:"7",downto:19,leftto:12,rightto:14,focusfunc:"showPicFocus(3,2)",unfocusfunc:"showPicFocus(3,2)",clickfunc:"voteFunc(3,2)", page:2},
//     {id:14,domid:"",upto:"8",downto:20,leftto:13,rightto:15,focusfunc:"showPicFocus(3,3)",unfocusfunc:"showPicFocus(3,3)",clickfunc:"voteFunc(3,3)", page:2},
//     {id:15,domid:"",upto:"9",downto:21,leftto:14,rightto:16,focusfunc:"showPicFocus(3,4)",unfocusfunc:"showPicFocus(3,4)",clickfunc:"voteFunc(3,4)", page:2},
//     {id:16,domid:"",upto:"10",downto:22,leftto:15,rightto:17,focusfunc:"showPicFocus(3,5)",unfocusfunc:"showPicFocus(3,5)",clickfunc:"voteFunc(3,5)", page:2},
//     {id:17,domid:"",upto:"11",downto:23,leftto:16,rightto:"none",focusfunc:"showPicFocus(3,6)",unfocusfunc:"showPicFocus(3,6)",clickfunc:"voteFunc(3,6)", page:2},
//     {id:18,domid:"",upto:12,downto:24,leftto:"none",rightto:"19",focusfunc:"showPicFocus(4,1)",unfocusfunc:"showPicFocus(4,1)",clickfunc:"voteFunc(4,1)", page:2},
//     {id:19,domid:"",upto:13,downto:25,leftto:"18",rightto:"20",focusfunc:"showPicFocus(4,2)",unfocusfunc:"showPicFocus(4,2)",clickfunc:"voteFunc(4,2)", page:2},
//     {id:20,domid:"",upto:14,downto:26,leftto:"19",rightto:"21",focusfunc:"showPicFocus(4,3)",unfocusfunc:"showPicFocus(4,3)",clickfunc:"voteFunc(4,3)", page:2},
//     {id:21,domid:"",upto:15,downto:27,leftto:"20",rightto:"22",focusfunc:"showPicFocus(4,4)",unfocusfunc:"showPicFocus(4,4)",clickfunc:"voteFunc(4,4)", page:2},
//     {id:22,domid:"",upto:16,downto:28,leftto:"21",rightto:"23",focusfunc:"showPicFocus(4,5)",unfocusfunc:"showPicFocus(4,5)",clickfunc:"voteFunc(4,5)", page:2},
//     {id:23,domid:"",upto:17,downto:29,leftto:"22",rightto:"none",focusfunc:"showPicFocus(4,6)",unfocusfunc:"showPicFocus(4,6)",clickfunc:"voteFunc(4,6)", page:2},
//     //page3
//     {id:24,domid:"",upto:"18",downto:30,leftto:"none",rightto:25,focusfunc:"showPicFocus(5,1)",unfocusfunc:"showPicFocus(5,1)",clickfunc:"voteFunc(5,1)", page:3},
//     {id:25,domid:"",upto:"19",downto:31,leftto:24,rightto:26,focusfunc:"showPicFocus(5,2)",unfocusfunc:"showPicFocus(5,2)",clickfunc:"voteFunc(5,2)", page:3},
//     {id:26,domid:"",upto:"20",downto:32,leftto:25,rightto:27,focusfunc:"showPicFocus(5,3)",unfocusfunc:"showPicFocus(5,3)",clickfunc:"voteFunc(5,3)", page:3},
//     {id:27,domid:"",upto:"21",downto:33,leftto:26,rightto:28,focusfunc:"showPicFocus(5,4)",unfocusfunc:"showPicFocus(5,4)",clickfunc:"voteFunc(5,4)", page:3},
//     {id:28,domid:"",upto:"22",downto:34,leftto:27,rightto:29,focusfunc:"showPicFocus(5,5)",unfocusfunc:"showPicFocus(5,5)",clickfunc:"voteFunc(5,5)", page:3},
//     {id:29,domid:"",upto:"23",downto:35,leftto:28,rightto:"none",focusfunc:"showPicFocus(5,6)",unfocusfunc:"showPicFocus(5,6)",clickfunc:"voteFunc(5,6)", page:3},
//     {id:30,domid:"",upto:24,downto:"36",leftto:"none",rightto:"31",focusfunc:"showPicFocus(6,1)",unfocusfunc:"showPicFocus(6,1)",clickfunc:"voteFunc(6,1)", page:3},
//     {id:31,domid:"",upto:25,downto:"36",leftto:"30",rightto:"32",focusfunc:"showPicFocus(6,2)",unfocusfunc:"showPicFocus(6,2)",clickfunc:"voteFunc(6,2)", page:3},
//     {id:32,domid:"",upto:26,downto:"36",leftto:"31",rightto:33,focusfunc:"showPicFocus(6,3)",unfocusfunc:"showPicFocus(6,3)",clickfunc:"voteFunc(6,3)", page:3},
//     {id:33,domid:"",upto:27,downto:"36",leftto:"32",rightto:"34",focusfunc:"showPicFocus(6,4)",unfocusfunc:"showPicFocus(6,4)",clickfunc:"voteFunc(6,4)", page:3},
//     {id:34,domid:"",upto:28,downto:"36",leftto:"33",rightto:"35",focusfunc:"showPicFocus(6,5)",unfocusfunc:"showPicFocus(6,5)",clickfunc:"voteFunc(6,5)", page:3},
//     {id:35,domid:"",upto:29,downto:"36",leftto:"34",rightto:"none",focusfunc:"showPicFocus(6,6)",unfocusfunc:"showPicFocus(6,6)",clickfunc:"voteFunc(6,6)", page:3},
//     //submit dialog
//     {id:36,domid:"",upto:33,downto:"none",leftto:"none",rightto:"none",focusfunc:"showSubmit()",unfocusfunc:"showSubmit()",clickfunc:"showDialog()", page:3},
//     //input
//     {id:37,domid:"",upto:"none",downto:"38",leftto:"none",rightto:"none",focusfunc:"inputEmail()",unfocusfunc:"",clickfunc:"", page:3},
//     //dialog submit
//     {id:38,domid:"",upto:37,downto:"none",leftto:"none",rightto:"none",focusfunc:"updateDialogBtn()",unfocusfunc:"updateDialogBtn()",clickfunc:"submit()", page:3},
// ];
var pageFocusList = [];
for(var i=0;i < voteFuncContent.length;i++){
    for(var j=0;j < voteFuncContent[i].poster.length;j++){
        var id = voteFuncContent[i].poster.length * i + j;
        pageFocusList.push({
            id: id ,
            domid:"",
            upto: i == 0 ? "none" : id-voteFuncContent[i].poster.length,
            downto:i == voteFuncContent.length-1?(voteFuncContent.length)*(voteFuncContent[i].poster.length):id+voteFuncContent[i].poster.length,
            leftto:j == 0 ? "none":id-1,
            rightto:j == voteFuncContent[i].poster.length-1 ? "none" : id+1,
            focusfunc:"showPicFocus("+(i+1)+","+(j+1)+");",
            unfocusfunc:"showPicFocus("+(i+1)+","+(j+1)+");",
            clickfunc:"voteFunc("+(i+1)+","+(j+1)+");",
            page:Math.ceil((i+1+1)/2)
        })
    }
}
pageFocusList.push({id: i*j , domid:"", upto: i*j-3, downto:"none", leftto:"none", rightto:"none", focusfunc:"showSubmit()", unfocusfunc:"showSubmit()", clickfunc:"showDialog()", page:Math.ceil((i+1)/2)});
pageFocusList.push({id: i*j+1 , domid:"", upto: "none", downto:i*j+2, leftto:"none", rightto:"none", focusfunc:"inputEmail()", unfocusfunc:"inputEmail()", clickfunc:"mygetFocus()", page:Math.ceil((i+1)/2)});
pageFocusList.push({id: i*j+2 , domid:"", upto: i*j+1, downto:"none", leftto:"none", rightto:i*j+3, focusfunc:"updateDialogBtn()", unfocusfunc:"updateDialogBtn()", clickfunc:"submit()", page:Math.ceil((i+1)/2)});
pageFocusList.push({id: i*j+3 , domid:"", upto: i*j+1, downto:"none", leftto:i*j+2, rightto:"none", focusfunc:"updateSkipBtn()", unfocusfunc:"updateSkipBtn()", clickfunc:"cancelDialog()", page:Math.ceil((i+1)/2)});
/**
 * 用户点击ok后的投票记录，题号：选项（0未选）
 * @type {{1: string, 2: string, 3: string, 4: string, 5: string, 6: string, 7: string, 8: string, 9: string, 10: string, 11: string, 12: string}}
 */
var myVotedState = {
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0,
    10:0,
    11:0,
    12:0,
    13:0
}