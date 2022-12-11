<template>
    <div>
        Redirecting...
    </div>
</template>

<script>
    export default{
        computed:{
            query_params(){
                return this.$route.query;
            }
        },
        mounted(){
            this.acceptRedirect();
        },
        methods: {
            acceptRedirect(){
                localStorage.clear();
                localStorage.setItem('token', this.query_params.token);
                localStorage.setItem('ui', this.query_params.id);
                window.location.href="/asc/page/announcement";
            }
        }
    }
</script>