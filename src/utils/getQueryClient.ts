import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

// QueryClient 싱글톤 인스턴스 생성
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
