import { actions, Machine } from 'xstate';
import axios from 'axios';

const { assign } = actions;

const apiKey = 'DEMO_KEY'

const fetchPicture = (date) =>
  axios(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
    .then(
      res => {
        if (!res.statusText === 'OK') {
          throw new Error('Something went wrong');
        }
        return res.data;
      },
      err => {
        throw err;
      }
    );


const fetchPictures = (_, { dates }) => {
  return Promise.all(
    dates.map(date =>
      fetchPicture(date).then(response => response)
    )
  );
};

export const apodMachine = Machine(
  {
    id: 'apod',
    initial: 'start',
    context: {
      currentPhoto: null,
      errorMessage: null,
      isHd: false,
      photos: [],
    },
    states: {
      start: {
        on: {
          FETCH: 'loading',
        },
      },
      loading: {
        invoke: {
          id: 'fetchPictures',
          src: fetchPictures,
          onDone: {
            target: 'gallery',
            actions: ['setPhotos']
          },
          onError: {
            target: 'failure',
            actions: ['setErrorMessage']
          },
        },
      },
      failure: {
        on: {
          RETRY: 'loading',
        },
      },
      gallery: {
        on: {
          FETCH: 'loading',
          SELECT_PHOTO: {
            target: 'photo',
            actions: ['setCurrentPhoto'],
          }
        }
      },
      photo: {
        on: {
          ZOOM_PHOTO: {
            target: 'hdphoto',
            actions: ['toggleIsHd'],
          },
          LEAVE_PHOTO: {
            target: 'gallery',
            actions: ['clearCurrentPhoto'],
          }
        }
      },
      hdphoto: {
        on: {
          LEAVE_HD_PHOTO: {
            target: 'photo',
            actions: ['toggleIsHd'], 
          }
        }
      }
    }
  }, 
  {
    actions: {
      clearCurrentPhoto: assign({ currentPhoto: null }),
      setCurrentPhoto: assign({ currentPhoto: (_, event) => event.currentPhoto }),
      setErrorMessage: assign({ errorMessage: (_, event) => event.data }),
      setPhotos: assign({ photos: (_, event) => event.data }),
      toggleIsHd: assign({ isHd: (context) => !context.isHd }),
    },
    services: {
      fetch: context => axios(context.url).then(response => response.data)
    }
  }
);

