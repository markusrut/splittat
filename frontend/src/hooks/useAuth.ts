import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";
import type { LoginRequest, RegisterRequest } from "@/types";

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    login: loginStore,
    logout: logoutStore,
    user,
    isAuthenticated,
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      loginStore(response.token, response.user);
      navigate("/receipts");
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      loginStore(response.token, response.user);
      navigate("/receipts");
    },
  });

  // Logout function
  const logout = () => {
    logoutStore();
    navigate("/login");
  };

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    registerLoading: registerMutation.isPending,
    registerError: registerMutation.error,
    logout,
  };
};
