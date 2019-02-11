import partsAnalysisService from '../services/partsAnalysis.service'

const state = {
    status: {
        success: '',
        failure: '',
    },
    spare_part_analysis: ''
};

const actions = {

    get_spare_part_analysis({ commit }) {
        console.log('module sucess')
        partsAnalysisService.get_spare_part_analysis().then(data => {
            console.log('data ---module-->', data)
            commit('spare_part_analysis', data)
        }).catch(error => console.log('error ------>', error))
    },

    post_spare_part_analysis({ commit }, data) {
        console.log('module create_spare_part_analysis success', data)
        partsAnalysisService.post_spare_part_analysis(data).then(responsedata => {
            console.log('reponse data ----->', responsedata)
            commit('post_spare_part_analysis', responsedata)
        }).catch(error => console.log('error ------>', error))
    },
    get_all_request_analysis({ commit }) {
        partsAnalysisService.get_all_request_analysis().then(data => {
            console.log('data ---module-->', data)
            commit('get_all_request_analysis', data)
        }).catch(error => console.log('error ------>', error))
    },
    get_request_analysis_by_Id({ commit }, data) {
        partsAnalysisService.get_request_analysis_by_Id(data).then(data => {
            console.log('data ---module-->', data)
            commit('get_request_analysis_by_Id', data)
        }).catch(error => console.log('error ------>', error))

    },
    get_request_analysis_summary_result({ commit }, data) {
        partsAnalysisService.get_request_analysis_summary_result(data).then(data => {
            console.log('data ---module-->', data)
            commit('get_request_analysis_summary_result', data)
        }).catch(error => console.log('error ------>', error))
    },
    get_dashboard_request_count({ commit }) {
        partsAnalysisService.get_dashboard_request_count().then(data => {
            console.log('data ---module-->', data)
            commit('get_dashboard_request_count', data)
        }).catch(error => console.log('error ------>', error))
    }

}

const mutations = {
    spare_part_analysis(state, payload) {
        console.log('mutation ----->', payload)
        state.status.success = true
        state.spare_part_analysis = payload
    },
    post_spare_part_analysis(state, payload) {
        console.log('mutation ------->', payload)
        // state.status.success = true
        state.post_spare_part_analysis = payload
    },
    get_all_request_analysis(state, payload) {
        console.log('mutation ------->', payload)
        // state.status.success = true
        state.get_all_request_analysis = payload
    },
    get_request_analysis_by_Id(state, payload) {
        state.status.success = true
        let object = {
            sapfileName: payload[0].sap_file_name,
            dnafileName: payload[0].dna_file_name,
            analyisisName: payload[0].analysis_name,
            customerNames: payload[0].customer_name,
            analysisType: payload[0].analysis_type,
            replensihTime: payload[0].analysis_name,
            date: payload[0].analysis_request_time,
            requestStatus: payload[0].requestStatus,
            stepName: payload[0].step_name,
            stepId: payload[0].step_id
        }
        state.get_request_analysis_by_Id = object
    },
    get_request_analysis_summary_result(state, payload) {
        state.status.success = true
        state.get_request_analysis_summary_result = payload
    },
    get_dashboard_request_count(state, payload) {
        state.status.success = true
        state.get_dashboard_request_count = payload
    }
}

export const partsAnalysis = {
    namespaced: true,
    state,
    actions,
    mutations
};