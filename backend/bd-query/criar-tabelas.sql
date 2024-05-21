USE smimabd_mysql;

-- Tabela de Usuários
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    profile_type ENUM('cultivador', 'vendedor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Perfis
CREATE TABLE Profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    bio TEXT,
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabela de Seguidores
CREATE TABLE Followers (
    follower_id INT,
    followee_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, followee_id),
    FOREIGN KEY (follower_id) REFERENCES Users(user_id),
    FOREIGN KEY (followee_id) REFERENCES Users(user_id)
);

-- Tabela de Postagens
CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT,
    caption TEXT,
    category ENUM('Jardim', 'Apartamento', 'Casa', 'Alimentação', 'Hobbie', 'Outros'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabela de Curtidas
CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabela de Postagens Salvas
CREATE TABLE SavedPosts (
    saved_post_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabela de Comentários
CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabela de Notificações
CREATE TABLE Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type ENUM('curtida', 'comentário', 'novo_seguidor', 'outra') NOT NULL,
    related_user_id INT,
    post_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (related_user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

-- Tabela de Plantas
CREATE TABLE Plants (
    plant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255)
);

-- Tabela de Doenças
CREATE TABLE Diseases (
    disease_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255)
);

-- Tabela de Assinaturas
CREATE TABLE Subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type ENUM('mensal', 'anual') NOT NULL,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabela de Vendas
CREATE TABLE Sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    seller_id INT,
    buyer_id INT,
    product_id INT,
    amount INT,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES Users(user_id),
    FOREIGN KEY (buyer_id) REFERENCES Users(user_id)
);

-- Tabela Intermediária para Postagens e Plantas (Muitos-para-Muitos)
CREATE TABLE Post_Plants (
    post_id INT,
    plant_id INT,
    PRIMARY KEY (post_id, plant_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (plant_id) REFERENCES Plants(plant_id)
);

-- Tabela Intermediária para Postagens e Doenças (Muitos-para-Muitos)
CREATE TABLE Post_Diseases (
    post_id INT,
    disease_id INT,
    PRIMARY KEY (post_id, disease_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id),
    FOREIGN KEY (disease_id) REFERENCES Diseases(disease_id)
);

-- Índices para melhorar a performance das buscas
CREATE INDEX idx_user_profile ON Profiles(user_id);
CREATE INDEX idx_follower_followee ON Followers(follower_id, followee_id);
CREATE INDEX idx_post_user ON Posts(user_id);
CREATE INDEX idx_comment_post ON Comments(post_id);
CREATE INDEX idx_comment_user ON Comments(user_id);
CREATE INDEX idx_like_post ON Likes(post_id);
CREATE INDEX idx_like_user ON Likes(user_id);
CREATE INDEX idx_saved_post_user ON SavedPosts(user_id);
CREATE INDEX idx_saved_post_post ON SavedPosts(post_id);
CREATE INDEX idx_notification_user ON Notifications(user_id);
CREATE INDEX idx_notification_related_user ON Notifications(related_user_id);
CREATE INDEX idx_notification_post ON Notifications(post_id);
CREATE INDEX idx_subscription_user ON Subscriptions(user_id);
CREATE INDEX idx_sale_seller ON Sales(seller_id);
CREATE INDEX idx_sale_buyer ON Sales(buyer_id);
