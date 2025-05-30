import { Button, useToast } from '@chakra-ui/react';
import { useStore } from '@/store/useStore';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { socketService } from '@/services/socket';

// 登入按鈕組件
const LoginButton = () => {
  const router = useRouter();
  const toast = useToast();
  // 從 store 中獲取 setUser 函數
  const setUser = useStore((state) => state.setUser);

  // 處理登入邏輯
  const handleLogin = () => {
    try {
      // const userId = uuidv4();

      // 連接 Socket.IO
      // socketService.connect(userId);
      socketService.connect();

      // 更新使用者狀態
      setUser({
        userId: socketService.userId,
        isLoggedIn: true,
      });

      // 在狀態更新後執行其他操作
      localStorage.setItem('userId', socketService.userId);

      // 顯示成功訊息
      toast({
        title: '登入成功',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // 導航到筆記頁面
      router.push('/notes');
    } catch (error) {
      // 顯示錯誤訊息
      toast({
        title: '登入失敗',
        description: error instanceof Error ? error.message : '請稍後再試',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      size="lg"
      colorScheme="blue"
      onClick={handleLogin}
      px={8}
      py={6}
      fontSize="lg"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      transition="all 0.2s"
    >
      開始使用
    </Button>
  );
};

export default LoginButton; 
