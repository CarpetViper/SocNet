import React, {useState} from 'react';
import Preloader from '../preloader/preloader';
import styles from './profileInfo.module.css';
import ProfileStatusWithHooks from './profileStatusWithHooks';
import userPhoto from '../../img/user.png';
import ProfileDataForm from './profileDataForm';


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
      return <Preloader />
    }

    const onPhotoSelected = (e) => {
      if(e.target.files.length) {
         savePhoto(e.target.files[0]);
      }
    }

    const onSubmit = (formData) => {
          saveProfile(formData).then(
            () => {
             setEditMode(false);
            }
          );
        }

  return (
    <div className={styles.profileInfo_row}>
        <div className={styles.profileInfo_cell}>
            <div className={styles.photo_input}>
               <img src={profile.photos.large || userPhoto} className={styles.photo}/>
               <div className={styles.input}>
                  {isOwner && <input type={'file'} onChange={onPhotoSelected} />}
               </div>
           </div>
           <div>
               {editMode
                 ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                 : <ProfileData toEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner} />}

                   <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
           </div>
        </div>
    </div>
  )
}

const ProfileData = ({profile, isOwner, toEditMode}) => {
  return (
       <div className={styles.profileData}>
           <div className={styles.profileData_items}>
               <div className={styles.edit}>
                   {isOwner && <div><button onClick={toEditMode}>edit</button></div>}
               </div>
               <div className={styles.fullName}>
                   <b>Full name</b>: {profile.fullName}
               </div>
               <div className={styles.lookingForAJob}>
                   <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
               </div>
               {profile.lookingForAJob &&
               <div className={styles.lookingForAJobDescription}>
                  <b>My professional skills</b>: {profile.lookingForAJobDescription}
               </div>
               }
               <div className={styles.aboutMe}>
                   <b>About me</b>: {profile.aboutMe}
               </div>
           </div>
               <div className={styles.contacts}>
               <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
               return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
           })}
           </div>
       </div>
  )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={styles.contactsItems}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
