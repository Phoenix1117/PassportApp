const id_token = localStorage.getItem('id_token');

export default {

    get_spare_part_analysis() {
        console.log('calling get_spare_part_analysis service')
        return fetch('http://10.138.1.2:5000/api/v1/get_spare_part_analysis', {
            method: 'GET',
        }).then(response => {
            return this.handleresponse(response)
        }).catch(handleError => {
            console.log(' Error Response ------->', handleError)
        })
    },

    post_spare_part_analysis(data) {
        console.log('calling create_spare_part_analysis service', data)
        let formData = new FormData();
        formData.append('analysis_name', data.analyisisName)
        formData.append('analysis_type', data.analysisType)
        formData.append('replenish_time', data.replensihTime)
        formData.append('customer_dna_file', data.dnafile)
        formData.append('user_email_id', 'khali.saran@ekryp.com')
        formData.append('customer_name', data.customerNames)
        formData.append('sap_export_file', data.sapfile)
        console.log('formdata ----->', formData.get('analysis_name'))
        return fetch('http://10.138.1.2:5000/api/v1/post_spare_part_analysis', {
            method: 'POST',
            body: formData
        }).then(response => {
            return this.handleresponse(response)
        }).catch(handleError => {
            console.log(' Error Response ------->', handleError)
        })

    },

    get_all_request_analysis() {
        console.log('calling get_all_request_analysis service')
        return fetch('http://10.138.1.2:5000/api/v1/get_steps_all_users', {
            method: 'GET',
        }).then(response => {
            return this.handleresponse(response)
        }).catch(handleError => {
            console.log(' Error Response ------->', handleError)
        })
    },

    get_request_analysis_by_Id(data) {
        console.log('calling get_request_analysis_by_Id service')
        return fetch('http://10.138.1.2:5000/api/v1/get_steps_specific_request?request_id=' + data, {
            method: 'GET',
        }).then(response => {
            return this.handleresponse(response)
        }).catch(handleError => {
            console.log(' Error Response ------->', handleError)
        })
    },
    get_request_analysis_summary_result(data) {
        console.log('calling get_request_analysis_summary_result service')
        return fetch('http://10.138.1.2:5000/api/v1/get_summary_specific_request?request_id=' + data, {
            method: 'GET',
        }).then(response => {
            return this.handleresponse(response)
        }).catch(handleError => {
            console.log(' Error Response ------->', handleError)
        })
    },
    get_dashboard_request_count() {
        console.log('calling get_dashboard_request_count service')
        return fetch('http://10.138.1.2:5000/api/v1/get_dashboard_request_count', {
            method: 'GET',
        }).then(response => {
            return this.handleresponse(response)
        }).catch(handleError => {
            console.log(' Error Response ------->', handleError)
        })
    },

    handleresponse(response) {
        console.log('success', response)
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log('data ---->', new Date(), data)
            return data;
        });
    }
}

