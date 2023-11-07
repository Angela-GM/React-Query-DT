import axios from 'axios';

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization: 'Bearer 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'
    }
})