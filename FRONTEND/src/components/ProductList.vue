<template>
    <div>
        <h2>Lista de Produtos</h2>
        <button @click="showCreateForm=true">Adicionar Produto</button>
        <ul>
            <li v-for="produto in produtos":key="produto.id">
                {{ produto.descricao }}
                {{ produto.marca }}
                {{ produto.valor }}
                {{ produto.quantidade }}
                <button @click="editProduto(produto)">Editar</button>
                <button @click="deleteProd(produto.id)">Deletar</button>
            </li>
        </ul>
        <div v-if="showCreateForm">
            <h3>Adicionar Produto</h3>
            <input v-model="newProd.descricao" placeholder="Nome do produto">
            <input v-model="newProd.marca" placeholder="Marca do produto">
            <input v-model="newProd.valor" placeholder="Valor do produto">
            <input v-model="newProd.quantidade" placeholder="Quantidade do produto">
            <button @click="createProd">Salvar</button>
            <button @click="showCreateForm=false">Cancelar</button>
        </div>
        <div v-if="showEditForm">
            <h3>Editar Produtos</h3>
            <input v-model="editProdForm.descricao" placeholder="Nome do produto">
            <input v-model="editProdForm.marca" placeholder="Marca do produto">
            <input v-model="editProdForm.valor" placeholder="Valor do produto">
            <input v-model="editProdForm.quantidade" placeholder="Quantidade do produto">
            <button @click="updateProd">Atualizar</button>
            <button @click="showEditForm=false">Cancelar</button>
        </div>
    </div>
</template>

<script>
    import api from '../services/api';

    export default {
        data(){
            return{
                produtos: [],
                showCreateForm: false,
                showEditForm: false,
                newProd: {
                    id: '',
                    descricao: '',
                    marca: '',
                    valor: '',
                    quantidade: '',
                },
                editProdForm: {
                    id: '',
                    descricao: '',
                    marca: '',
                    valor: '',
                    quantidade: '',
                },
            };
        },
        methods: {
            async fetchProd(){
                try{
                    const response = await api.get('/produtos');
                    this.produtos = response.data;
                }catch (error){
                    console.error('Erro ao buscar produtos', error);
                }
            },
            async createProd(){
                try{
                    await api.post('/produtos', this.newProd);
                    this.newProd = {id: '', descricao: '', marca: '', valor: '', quantidade: ''};
                    this.showCreateForm = false;
                    this.fetchProd();
                }catch (error){
                    console.error('Erro ao criar o produto', error);
                }
            },
            editProduto(produto){
                this.editProdForm = {produto};
                this.showEditForm = true;
            },
            async updateProd(){
                try{
                    await api.put(`/produtos/${this.editProdForm.id}`, this.editProdForm);
                    this.editProdForm = {id: '', descricao: '', marca: '', valor: '', quantidade: ''};
                    this.showEditForm = true;
                    this.fetchProd();
                }catch (error){
                    console.error('Erro ao atualizar o produto: ', error);
                }
            },
            async deleteProd(){
                try{
                    await api.delete(`/produtos/${id}`);
                    this.fetchProd();
                }catch (error){
                    console.error('Erro ao deletar produto: ', error);
                }
            },  
        },
        created() {
            this.fetchProd();
        },
    };
</script>

<style scoped>

</style>