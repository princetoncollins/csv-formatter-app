var stringInput = Vue.component('string-input', {
    data: () => {
        return {
            value: this.value,
            formattedString: ''
        }
    },
    template: `<div class="string-input-container">
                  <textarea class="textarea" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" rows="10"></textarea>
                  <div class="actions">
                    <button class="button" v-on:click="formatCsvInput">Format CSV String</button>
                  </div>
               </div>`,
    methods: {
        formatCsvInput: () => {
            fetch('/api/format?string=' + vm.string )
            .then((response) => {
                response.json()
                .then((response) => {
                    if (response.error) {
                        vm.formattedString = '';
                        return vm.error = response.error;
                    } else if (response.data.error) {
                        vm.formattedString = '';
                        return vm.error = response.data.error;
                    } else if (Object.keys(response.data).length === 0 && response.data.constructor === Object) { 
                        // Basically handling all other invalid input that would otherwise give us a benign error, like an empty response.data object, for example.
                        // There is probably a better way to do this.
                        vm.formattedString = '';
                        return vm.error = 'Invalid input.\r\n\r\nLooks like there might be some syntax errors. Fix your CSV string and try again.';
                    }

                    vm.error = '';

                    // Why?
                    vm.formattedString = 'Snap!';
                    setTimeout(() => {
                        vm.formattedString = 'Crackle!';
                    }, 600)
                    setTimeout(() => {
                        vm.formattedString = 'POP!';
                    }, 1200);
                    setTimeout(() => {
                        vm.formattedString = response.data;
                    }, 1800);
                    // Why not? :)
                });
            });


            
        }
    }
});

var vm = new Vue({
    el: '#app',
    data: {
        string: '',
        formattedString: '',
        error: ''
    },
    components: {
        stringInput: stringInput
    }
});