import { useState, useEffect } from 'react';
import { useTodoLists } from './hooks/useTodoLists';
import { useTodoItems } from './hooks/useTodoItems';
import { useToast } from './hooks/useToast';
import { CreateTodoListDto, UpdateTodoListDto, TodoList } from './types/todoList.types';
import { CreateTodoItemDto, UpdateTodoItemDto, TodoItem } from './types/todoItem.types';
import { TodoListHeader } from './components/TodoList/TodoListHeader';
import { TodoListsPanel } from './components/TodoList/TodoListPanel';
import { TodoListForm } from './components/TodoList/TodoListForm';
import { TodoItemsPanel } from './components/TodoItem/TodoItemsPanel';
import { TodoItemForm } from './components/TodoItem/TodoItemForm';
import { Modal } from './components/common/Modal';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ToastContainer } from './components/common/ToastContainer';

function App() {
  // Toast hook
  const { toasts, showToast, removeToast } = useToast();

  // states and hooks
  const {
    todoLists,
    loading: listsLoading,
    error: listsError,
    createTodoList,
    updateTodoList,
    deleteTodoList,
    refetch: refetchLists,
  } = useTodoLists();

  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [editingList, setEditingList] = useState<TodoList | null>(null);
  const [editingItem, setEditingItem] = useState<TodoItem | null>(null);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const {
    todoItems,
    loading: itemsLoading,
    error: itemsError,
    completingAll,
    createTodoItem,
    updateTodoItem,
    toggleTodoItem,
    completeAllTodoItems,
    deleteTodoItem,
    refetch: refetchItems,
  } = useTodoItems(selectedListId);

  // Initial charge has finished?
  useEffect(() => {
    if (!listsLoading) {
      setHasLoaded(true);
    }
  }, [listsLoading]);

  // Handlers -lists 
  const handleCreateList = () => {
    setEditingList(null);
    setIsListModalOpen(true);
  };

  const handleEditList = (list: TodoList) => {
    setEditingList(list);
    setIsListModalOpen(true);
  };

  const handleSubmitList = async (data: CreateTodoListDto | UpdateTodoListDto) => {
    try {
      if (editingList) {
        await updateTodoList(editingList.id, data as UpdateTodoListDto);
        showToast('List updated successfully', 'success');
      } else {
        const newList = await createTodoList(data as CreateTodoListDto);
        setSelectedListId(newList.id);
        showToast('List created successfully', 'success');
      }
      setIsListModalOpen(false);
      setEditingList(null);
      refetchLists();
    } catch (error) {

      const errorMessage = error instanceof Error ? error.message : 'Error processing list';
      showToast(errorMessage, 'error');
    }
  };

  const handleDeleteList = async (id: number) => {
    if (window.confirm('Are you sure to delete this list?')) {
      try {
        await deleteTodoList(id);
        if (selectedListId === id) {
          setSelectedListId(null);
        }
        showToast('Successfully deleted list', 'success');
        refetchLists();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error deleting list';
        showToast(errorMessage, 'error');
      }
    }
  };

  // Handlers para items
  const handleCreateItem = () => {
    setEditingItem(null);
    setIsItemModalOpen(true);
  };

  const handleEditItem = (item: TodoItem) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleSubmitItem = async (data: CreateTodoItemDto | UpdateTodoItemDto) => {
    try {
      if (editingItem) {
        await updateTodoItem(editingItem.id, data as UpdateTodoItemDto);
        showToast('Task updated successfully', 'success');
      } else {
        await createTodoItem(data as CreateTodoItemDto);
        showToast('Task created successfully', 'success');
      }
      setIsItemModalOpen(false);
      setEditingItem(null);
      refetchItems();
      refetchLists();
    } catch (error) {

      const errorMessage = error instanceof Error ? error.message : 'Error processing task';
      showToast(errorMessage, 'error');
    }
  };

  const handleToggleItem = async (id: number) => {
    try {
      await toggleTodoItem(id);
      refetchItems();
      refetchLists();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error changing status';
      showToast(errorMessage, 'error');
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await deleteTodoItem(id);
        showToast('Task deleted successfully', 'success');
        refetchItems();
        refetchLists();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error deleting task';
        showToast(errorMessage, 'error');
      }
    }
  };

  const handleCompleteAllItems = async () => {
    if (!selectedListId) return;
    
    try {
      await completeAllTodoItems();
      showToast('All tasks completed', 'success');
      refetchLists();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error completing all tasks';
      showToast(errorMessage, 'error');
    }
  };

  const selectedList = todoLists.find(list => list.id === selectedListId);
  const completedItems = todoItems.filter(item => item.completed).length;
  const totalItems = todoItems.length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const showInitialLoader = listsLoading && !hasLoaded;

  if (showInitialLoader) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando tus listas..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <TodoListHeader 
          onCreateNew={handleCreateList} 
          listCount={todoLists.length}
        />

        {/* List error */}
        {listsError && (
          <div className="mt-6 p-4 bg-red-50/50 backdrop-blur-sm border border-red-200 rounded-xl animate-fade-in">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 text-sm">{listsError}</p>
            </div>
          </div>
        )}

        {/* Main panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 animate-slide-up">
          {/* left panel: lists */}
          <TodoListsPanel
            todoLists={todoLists}
            selectedListId={selectedListId}
            onSelectList={setSelectedListId}
            onEditList={handleEditList}
            onDeleteList={handleDeleteList}
            onCreateList={handleCreateList}
          />

          {/* Right panel: Items from the selected list */}
          <TodoItemsPanel
            selectedList={selectedList}
            todoItems={todoItems}
            loading={itemsLoading}
            error={itemsError}
            progress={progress}
            completedItems={completedItems}
            totalItems={totalItems}
            onToggleItem={handleToggleItem}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onCreateItem={handleCreateItem}
            onCompleteAll={handleCompleteAllItems}
            completingAll={completingAll}
          />
        </div>
      </div>

      {/* Modal create/update list */}
      <Modal
        isOpen={isListModalOpen}
        onClose={() => {
          setIsListModalOpen(false);
          setEditingList(null);
        }}
        title={editingList ? 'Edit list' : 'Create new list'}
      >
        <TodoListForm
          onSubmit={handleSubmitList}
          onCancel={() => {
            setIsListModalOpen(false);
            setEditingList(null);
          }}
          initialData={editingList || undefined}
          isLoading={listsLoading}
        />
      </Modal>

      {/* Modal create/update item */}
      <Modal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setEditingItem(null);
        }}
        title={editingItem ? 'Edir task' : 'New task'}
      >
        <TodoItemForm
          onSubmit={handleSubmitItem}
          onCancel={() => {
            setIsItemModalOpen(false);
            setEditingItem(null);
          }}
          initialData={editingItem || undefined}
          isLoading={itemsLoading}
        />
      </Modal>

      {/* Toast container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;