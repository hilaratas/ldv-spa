import {GetterTree} from "vuex";
import {Article} from "@/typings/index"
import {NewsState} from "@/store/news/types";
import {RootState} from "@/store/types";

export const getters: GetterTree<NewsState, RootState> = {
    news (state): Array<Article> {
        return state.news
    },
    actions (state): Array<Article> {
        return state.a_and_s
    },
    specials (state): Array<Article> {
        return state.a_and_s
    }
}
