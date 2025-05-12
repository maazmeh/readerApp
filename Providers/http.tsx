import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import RNFS from 'react-native-fs';


const readerServer = 'https://dev.dotnetiks.com/readUpApp/readerApp';
const journalistServer = 'https://dev.dotnetiks.com/readUpApp/journalistApp';


export const showToastWithGravity = (title:any) => {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  }


/////////////////////////////  Jounalist App Services  /////////////////////////////////////////////////////////////////////
export  const fetchAllPostOfChannel = (channelID:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      const userLoginApi = journalistServer + '/fetchAllPosts.php?channelId=' + channelID;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      if(APIData.data.Status === 'failed'){
        reject('failed')
      } else {
        resolve(APIData.data);
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  })
}


export const uploadPost = (channelId:any, title:any, description:any, postImage:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userRegisterAPI = journalistServer + '/uploadNewPost.php?channelId=' + channelId + '&postTitle=' + title + '&postImage=' + postImage + '&postDescription=' + description;
          let eventData:any = '';
          const url = userRegisterAPI;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response', APIData.data);
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('Uploading Post failed, Please Try again later.');
          reject('failed')
        } else {
          showToastWithGravity('Posted Successfull ! Happy Writing');
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    }

export const fetchNumberOfPosts = (channelID:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      const userLoginApi = journalistServer + '/fetchChannelPostsNumber.php?channelId=' + channelID;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      if(APIData.data.Status === 'failed'){
        reject('failed')
      } else {
        resolve(APIData.data);
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  })
}

export const fetchChannelAnalytics = (channelID:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      const userLoginApi = journalistServer + '/fetchChannelSubscribers.php?channelId=' + channelID;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      if(APIData.data.Status === 'failed'){
        reject('failed')
      } else {
        resolve(APIData.data);
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  })
}

export const fetchCategories = () => {
  return new Promise(async (resolve, reject) => {
  try {
    const userLoginApi = journalistServer + '/fetchCategories.php';
      let eventData:any = '';
      const url = userLoginApi;
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Max-Age': '0',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Authorization',
      };
      const APIData = await axios.post(
        url,
        {
          ...eventData,
        },
        {
          headers: headers,
        },
      );
    console.log('API Response login', APIData.data);
    //returning user data to reducer
    if(APIData.data.Status === 'failed'){
      showToastWithGravity('Login Failed, Please Try Again Later');
      reject('failed')
    } else {
      resolve(APIData.data);
    }
  } catch (error) {
    console.error('Error:', error);
    reject(error)
  }
});
}

export const createChannel = (userId:any, channelName:any, channelLogo:any, channelType:any, description:any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRegisterAPI = journalistServer + '/createChannel.php?ownerId=' + userId + '&channelName=' + channelName + '&channelLogo=' + channelLogo + '&channelType=' + channelType + '&description=' + description;
        let eventData:any = '';
        const url = userRegisterAPI;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      console.log('API Response', APIData.data);
      if(APIData.data.Status === 'failed'){
        showToastWithGravity('User Registeration Failed, Please Try Again Later');
        reject('failed')
      } else {
        showToastWithGravity('Channel Created Successfull ! Login to Continue');
        resolve(APIData.data);
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  });
  }


  export const journalistRegister = async (firstName:any, lastName:any, password:any, email:any, phoneNumber:any, address:any, imageURL:any, gender:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userRegisterAPI = journalistServer + '/journalistRegister.php?firstName=' + firstName + '&password=' + password + '&email=' + email + '&lastName=' + lastName + '&address=' + address + '&profilePicture=' + imageURL + '&gender=' + gender + '&number=' + phoneNumber;
          let eventData:any = '';
          const url = userRegisterAPI;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response', APIData.data);
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('User Registeration Failed, Please Try Again Later');
          reject('failed')
        } else if(APIData.data.Status === 'exist'){ 
          showToastWithGravity('User Already Registered !');
          reject('exist')
        } else {
          showToastWithGravity('Registeration Successfull ! Login to Continue');
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    }


    export const journalistLogin = async(email:any, password:any) => {
      return new Promise(async (resolve, reject) => {
      try {
        console.log("loginUser got hit =>");
        const userLoginApi = journalistServer + '/journalistLogin.php?email=' + email + '&password=' + password;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response login', APIData.data);
        //returning user data to reducer
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('Login Failed, Please Try Again Later');
          reject('failed')
        } else {
          resolve(APIData.data);
          APIData.data.userTpe = 'journalist';
          await AsyncStorage.setItem('userData', JSON.stringify(APIData.data));
          showToastWithGravity('Login Successfull !');
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    }
  
  
  export const journalistCheckUser = async(email:any, password:any) => {
      return new Promise(async (resolve, reject) => {
        try {
          const userLoginApi = journalistServer + '/journalistLogin.php?email=' + email + '&password=' + password;
            let eventData:any = '';
            const url = userLoginApi;
            const headers = {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Max-Age': '0',
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Headers': 'Authorization',
            };
            const APIData = await axios.post(
              url,
              {
                ...eventData,
              },
              {
                headers: headers,
              },
            );
          if(APIData.data.Status === 'failed'){
            showToastWithGravity('Login Failed, Please Try Again Later');
            reject('failed')
          } else {
            showToastWithGravity('Login Successfull !');
            resolve(APIData);
          }
        } catch (error) {
          console.error('Error:', error);
          reject(error)
        }
      });
      }

      export const fetchAllSubscribersOfAChannel = async(channelId:any) => {
        return new Promise(async (resolve, reject) => {
          try {
            const userLoginApi = journalistServer + '/fetchAllSubscribers.php?channelId=' + channelId;
              let eventData:any = '';
              const url = userLoginApi;
              const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Max-Age': '0',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Authorization',
              };
              const APIData = await axios.post(
                url,
                {
                  ...eventData,
                },
                {
                  headers: headers,
                },
              );
            if(APIData.data.Status === 'failed'){
              reject('failed')
            } else {
              resolve(APIData);
            }
          } catch (error) {
            console.error('Error:', error);
            reject(error)
          }
        });
        }


/////////////////////////////  Reader App Services  /////////////////////////////////////////////////////////////////////

export const registerUser = async (username:any, password:any, email:any, contactNumber:any, address:any, profilePicture:any, gender:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userRegisterAPI = readerServer + '/readerRegister.php?username=' + username + '&password=' + password + '&email=' + email + '&contactNumber=' + contactNumber + '&address=' + address + '&profilePicture=' + profilePicture + '&gender=' + gender;
          let eventData:any = '';
          const url = userRegisterAPI;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response', APIData.data);
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('User Registeration Failed, Please Try Again Later');
          reject('failed')
        } else if(APIData.data.Status === 'exist'){ 
          showToastWithGravity('User Already Registered !');
          reject('exist')
        } else {
          showToastWithGravity('Registeration Successfull ! Login to Continue');
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    };

  export const readerlogin = async(email:any, password:any) => {
    return new Promise(async (resolve, reject) => {
    try {
      console.log("loginUser got hit =>");
      const userLoginApi = readerServer + '/readerLogin.php?email=' + email + '&password=' + password;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      console.log('API Response login', APIData.data);
      //returning user data to reducer
      if(APIData.data.Status === 'failed'){
        showToastWithGravity('Login Failed, Please Try Again Later');
        reject('failed')
      } else {
        resolve(APIData.data);
        APIData.data.userTpe = 'reader';
        await AsyncStorage.setItem('userData', JSON.stringify(APIData.data));
        showToastWithGravity('Login Successfull !');
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  });
  };


export const checkUser = async(email:any, password:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = readerServer + '/readerLogin.php?email=' + email + '&password=' + password;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('Login Failed, Please Try Again Later');
          reject('failed')
        } else {
          showToastWithGravity('Login Successfull !');
          resolve(APIData);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    };


  export const fetchData = () => {
    return new Promise(async (resolve,reject) => {
      try {
        const userLoginApi = readerServer + '/fetchAbout.php';
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          reject('failed')
        } else {
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    })
  }


  export const fetchAllChannels = () => {
    return new Promise(async (resolve,reject) => {
      try {
        const userLoginApi = readerServer + '/fetchAllChannels.php';
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          reject('failed')
        } else {
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    })
  }

 
  export const uploadSubscriptionIds = async (selectedIds:any, userId:any) => {
    const fetchPromises = selectedIds.map(async (id:any) => {
      try {
        const userLoginApi = readerServer + '/subscribeToChannel.php?channelId=' + id + '&subscriberId=' + userId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          
        } else {
          // resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        // reject(error)
      }
    });
    await Promise.all(fetchPromises);
  }

  export const subscribeToChannel = (id:any, userId:any) => {
    return new Promise(async (resolve,reject) => {
      try {
        const userLoginApi = readerServer + '/subscribeToChannel.php?channelId=' + id + '&subscriberId=' + userId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          reject('failed')
        } else {
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    })
  }

  export const fetchPostSubscribers = (userId:any) => {
    return new Promise(async (resolve,reject) => {
      try {
        const userLoginApi = readerServer + '/fetchSubscribedPosts.php?userId=' + userId;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          reject('failed')
        } else {
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    })
  }


export const fetchChannelDetails = (channelID:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      const userLoginApi = readerServer + '/fetchDetailsAboutChannel.php?channelId=' + channelID;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      if(APIData.data.Status === 'failed'){
        reject('failed')
      } else {
        resolve(APIData.data);
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  })
}


export const fetchAllPostOFAChannels = (channelID:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      const userLoginApi = readerServer + '/fetchAllPostsPerChannel.php?channelId=' + channelID;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      if(APIData.data.Status === 'failed'){
        reject('failed')
      } else {
        resolve(APIData.data);
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  })
}

export const checkForSubscription = (channelId:any, userId:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      const userLoginApi = readerServer + '/checkIfSubscriber.php?channelId=' + channelId + '&userId=' + userId;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      if(APIData.data.Status === 'exist'){
        resolve('exist')
      } else {
        resolve('notFound');
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  })
}


export const unsubscribeChannel = (channelId:any, userId:any) => {
  return new Promise(async (resolve,reject) => {
    try {
      const userLoginApi = readerServer + '/unsubscribeChannel.php?channelId=' + channelId + '&subscriberId=' + userId;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      if(APIData.data.Status === 'exist'){
        resolve('exist')
      } else {
        resolve('notFound');
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  })
}