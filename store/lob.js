import {
  deserialize,
  mapMutationsHelper,
  mapGettersHelper,
} from '@/utilities/helpers';

export const state = () => ({
  listLob: [],
});

export const mutations = {
  ...mapMutationsHelper(state()),
};
export const getters = {
  ...mapGettersHelper(state()),
};

export const actions = {
  async fetchData({ commit }) {
    const url = 'dashLOB';
    try {
      const res = await this.$axios.$get(url, {
        headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9kZXYtZ2F0ZXdheS1zZGEudG9tcHMuaWRcL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjY5NTE2MjA1LCJleHAiOjE2NzIxOTQ2MDUsIm5iZiI6MTY2OTUxNjIwNSwianRpIjoiaHNha052NTM2OVhKNW9wRSIsInN1YiI6Ijk1MzdiMjBmLTYxMWMtNDkwYS05MTRjLWNiMDJhZGNmMDg1ZiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.9IMWCQmOYUu5TybJ8nexpeokSq4r2_6BmBK8ix0Bxhs',
        },
      });

      if (res) {
        const {data} = res.data;
        commit('SET_LIST_LOB', data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          throw new Error('Request Failed');
        } else if (error.response.status === 401) {
          throw new Error('Bad Credentials');
        } else if (error.response.status === 502) {
          throw new Error('Network Error');
        }
      }
      throw error;
    }
  },
};
