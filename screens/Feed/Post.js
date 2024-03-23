// Componente de Post
const Post = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  
    const toggleExpansion = () => {
      setExpanded(!expanded);
    };
  
    const toggleFollow = () => {
      // Lógica para seguir ou deixar de seguir o usuário
      console.log('Seguir/deixar de seguir usuário');
    };
  
    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };
  
    // Função para realizar uma ação específica na publicação
    const handleAction = (action) => {
      console.log(`Realizar ação: ${action}`);
      // Lógica para realizar a ação específica, como salvar, compartilhar, etc.
    };
  
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <TouchableOpacity onPress={toggleFollow}>
              <Text style={styles.followButton}>{post.isFollowing ? 'Seguindo' : 'Seguir'}</Text>
            </TouchableOpacity>
            <Text style={styles.userName}>{post.userName}</Text>
            <Ionicons name="ellipsis-vertical" size={24} color="black" onPress={toggleModal} />
          </View>
          {/* Restante do cabeçalho */}
        </View>
  
        {/* Corpo da postagem */}
        {/* Restante do corpo da postagem */}
  
        {/* Modal de Ações */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => handleAction('Salvar')}>
                <Text style={styles.modalItem}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAction('Compartilhar')}>
                <Text style={styles.modalItem}>Compartilhar</Text>
              </TouchableOpacity>
              {/* Adicione mais ações conforme necessário */}
              <TouchableOpacity onPress={() => handleAction('Denunciar')}>
                <Text style={styles.modalItem}>Denunciar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={[styles.modalItem, styles.cancelButton]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    // Estilos do componente
  
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // Restante dos estilos
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      // Restante dos estilos
    },
    followButton: {
      // Estilo do botão de seguir
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalItem: {
      fontSize: 18,
      padding: 10,
    },
    cancelButton: {
      color: 'red',
      textAlign: 'center',
    },
  });
  