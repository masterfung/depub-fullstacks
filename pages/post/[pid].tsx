import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const Post = () => {
    const router = useRouter();
    const {pid} = router.query;
    
    return (
        <Layout>
            <div>POST TEST {pid}</div>
        </Layout>
    )
}

export default Post;