import type { TodoItem } from "../../atoms/todoAtom.ts";
//  To-Do 상태관리 공통 서비스 인터페이스
// 이 인터페이스를 구현하면 Redux/Recoil/Zustand 등 상태관리 라이브러리를 자유롭게 교체 가능
export interface TodoService {
  /**
   * 현재 모든 To-Do 항목을 가져옵니다.
   * UI 컴포넌트가 To-Do 목록을 표시할 때 사용
   * @returns TodoItem 배열
   */
  getTodos(): TodoItem[];

  /**
   * 상태가 변경될 때마다 콜백을 실행하도록 구독합니다.
   * 주로 localStorage 동기화나 상태 변화 로깅 등에 사용
   * @param callback 상태 변경 시 호출할 함수
   * @returns 구독 해제 함수 (unsubscribe)
   */
  subscribe(callback: (todos: TodoItem[]) => void): () => void;

  /**
   * 새 To-Do 항목을 추가합니다.
   * @param text 추가할 To-Do의 내용
   */
  addTodo(text: string): void;

  /**
   * 특정 To-Do 항목의 완료 여부(done)를 토글합니다.
   * @param index 토글할 항목의 인덱스
   */
  toggleTodo(index: number): void;

  /**
   * 특정 To-Do 항목을 삭제합니다.
   * @param index 삭제할 항목의 인덱스
   */
  removeTodo(index: number): void;

  /**
   * 전체 To-Do 목록을 초기화(비우기)합니다.
   */
  reset(): void;
}
