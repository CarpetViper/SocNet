import React from 'react';
import ProfileInfo from './profileInfo';

const Profile = (props) => {
    return (
      <div>
          <ProfileInfo isOwner={props.isOwner}
                       profile={props.profile}
                       status={props.status}
                       updateStatus={props.updateStatus}
                       savePhoto={props.savePhoto}
                       saveProfile={props.saveProfile} />
      </div>
    )
}

export default Profile;
