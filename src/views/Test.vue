<el-upload
        class="upload-demo"
        action="https://localhost:8183/addPic/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="picpath"
        list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<script>
    export default {
        data() {
            return {
                picpath: []//图片访问路径url
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        },created() {
            console.log('test')
        }
    }
</script>