//  상태를 localStorage와 동기화하는 서비스
import type { TodoService } from "./TodoService.ts";
import type { TodoItem } from "../../types/TodoItem.ts";

export class LocalStorageSync {
  private service: TodoService;
  private storageKey: string;
  /**
   * 생성자
   * @param service 상태관리 서비스(TodoService 인터페이스 구현체)ㄴ
   * @param storageKey localStorage에 저장할 때 사용할 key 값
   */
  constructor(
    service: TodoService, // 상태관리 서비스 (Redux/Recoil/Zustand 등)
    storageKey: string, // localStorage key 이름
  ) {
    this.service = service;
    this.storageKey = storageKey;

    // 상태 동기화 구독 등록
    // 상태가 바뀔 때마다 localStorage에 자동으로 저장
    this.service.subscribe((todos) => {
      localStorage.setItem(
        this.storageKey, // 저장할 key
        JSON.stringify(todos), // 현재 To-Do 목록을 JSON 문자열로 변환
      );
    });
  }

  /**
   * localStorage에 저장된 기존 데이터를 로드해서 상태 초기화
   */
  load() {
    const saved = localStorage.getItem(this.storageKey);

    if (saved) {
      const todos: TodoItem[] = JSON.parse(saved); // JSON 파싱하여 배열로 복원

      // 🟢 복원된 To-Do 항목들을 상태관리 서비스에 추가
      todos.forEach((todo) => this.service.addTodo(todo.text));
    }
  }
}
