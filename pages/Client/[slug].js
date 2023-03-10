import { sanityClient, urlFor, usePreviewSubscription } from "../../lib/sanity";
import Head from "next/head";
import react, {useState} from 'react';
import { useRouter } from "next/router";

const userQuery = `*[_type=="self" && slug.current == $slug][0]{
    slug,
    officeName->{officeName, officeWhatsapp, officeTwitter, officeInstagram},
    userName->{_id,fname, userWhatsapp, userTwitter, userInstagram,profile, pNo, profession}
  }`;

export default function OneUser({ data }) {
  const router = useRouter();
  if(!data){
    return <div>...loading</div>
  }
   const { user } = data;
   const {slug, userName, officeName } = user;
   const [show, setShow] = useState(false);
   const [officeShow, setOfficeShow] = useState(false);
   return (
     <div>
       <Head>
         <title>nfc-project</title>
         <meta name="description" content="Generated by create next app" />
         <link rel="icon" href="/favicon.ico" />
       </Head>
 
       <main>
         <div className="main-app">
           <div className="app-container d-flex-col">
             <div className="top d-flex-col center-align w-80">
               <div className="img-holder">
                 <img src={urlFor(userName.profile).url()} alt="x" />
               </div>
               <div className="client-intro d-flex-col center-align">
                 <h2>{userName.fname}</h2>
                 
                 <div className="office-intro d-flex-row">
                   <p className="office">{officeName.officeName}</p>
                   <span className="dot-sm"></span>
                   <p className="profession">{userName.profession}</p>
                 </div>
                 <button className="button call d-flex-row">
                   <a href={"tel:"+userName.pNo} className="d-flex-row">
                     <i className="bi bi-telephone-fill icon"></i>
                     <p>{userName.pNo}</p>
                   </a>
                 </button>
               </div>
             </div>
             <div className="middle d-flex-col w-80 center-align">
               <div className="header self d-flex-row center-align" onClick={e=>setShow(!show)}>
               <i className="bi bi-file-person icon"></i>
                 <p>self info</p>
               </div>
               <div className={show? "active account-holder d-flex-col w-96" : "account-holder d-flex-col w-96"}>
                 <button className="button social-btn d-flex-row">
                   <a
                     href={userName.userTwitter}
                     className="d-flex-row"
                   >
                     <i className="bi bi-twitter icon"></i>
                     <p>twitter</p>
                   </a>
                 </button>
                 <button className="button social-btn d-flex-row">
                   <a
                     href={userName.userInstagram}
                     className="d-flex-row"
                   >
                    <i className="bi bi-instagram icon"></i>
                     <p>instagram</p>
                   </a>
                 </button>
                 <button className="button social-btn d-flex-row">
                   <a href={userName.userWhatsapp} className="d-flex-row">
                   <i className="bi bi-whatsapp"></i>
                     <p>Whatsapp</p>
                   </a>
                 </button>
               </div>
             </div>
             <div className="bottom w-80 center-align d-flex-col">
               <div className="header d-flex-row" onClick={e=>setOfficeShow(!officeShow)}>
               <i className="bi bi-buildings-fill icon"></i>
                 <p>Office info</p>
               </div>
 
               <div className={officeShow? "active account-holder d-flex-col w-96" : "account-holder d-flex-col w-96"}>
                 <button className="button social-btn d-flex-row">
                   <a href={officeName.officeTwitter} className="d-flex-row">
                   <i className="bi bi-twitter icon"></i>
                     <p>twitter</p>
                   </a>
                 </button>
                 <button className="button social-btn d-flex-row">
                   <a href={officeName.officeInstagram} className="d-flex-row">
                   <i className="bi bi-instagram icon"></i>
                     <p>instagram</p>
                   </a>
                 </button>
                 <button className="button social-btn d-flex-row">
                   <a href={officeName.officeWhatsapp} className="d-flex-row">
                   <i className="bi bi-whatsapp icon"></i>
                     <p>Whatsapp</p>
                   </a>
                 </button>
               </div>
             </div>
           </div>
         </div>
       </main>
     </div>
   );
}

export async function getStaticPaths(){
    const paths = await sanityClient.fetch(`
    *[_type== "self" && defined(slug.current)]{
        "params": {
            "slug": slug.current
        }
    }
    `);

    return {
        paths, 
        fallback: true,
    }
}

export async function getStaticProps({ params }){
const { slug } = params;

const user = await sanityClient.fetch(userQuery, { slug });

return {
    props: { data: { user}}
};
}