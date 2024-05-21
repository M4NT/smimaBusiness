-- Inserindo dados de exemplo nas tabelas

-- Usuários
INSERT INTO Users (username, email, password, cpf, telefone, endereco, profile_type) VALUES 
('jardineiro01', 'jardineiro01@example.com', 'senha1', '123.456.789-00', '11999999999', 'Rua das Flores, 123, Jardim', 'cultivador'),
('plantasLindas', 'vendas@plantaslindas.com', 'senha2', '987.654.321-00', '11888888888', 'Avenida das Plantas, 456, Centro', 'vendedor');

-- Perfis
INSERT INTO Profiles (user_id, name, bio, profile_picture) VALUES 
(1, 'Jardineiro 01', 'Apaixonado por plantas.', 'http://example.com/perfil1.jpg'),
(2, 'Plantas Lindas', 'Vendemos as melhores plantas.', 'http://example.com/perfil2.jpg');

-- Seguidores
INSERT INTO Followers (follower_id, followee_id) VALUES 
(1, 2), -- Jardineiro 01 segue Plantas Lindas
(2, 1); -- Plantas Lindas segue Jardineiro 01

-- Postagens
INSERT INTO Posts (user_id, content, caption, category) VALUES 
(1, 'http://example.com/foto1.jpg', 'Minha nova planta!', 'Jardim'),
(2, 'http://example.com/foto2.jpg', 'Oferta especial!', 'Hobbie');

-- Curtidas
INSERT INTO Likes (post_id, user_id) VALUES 
(1, 2), -- Plantas Lindas curtiu a postagem de Jardineiro 01
(2, 1); -- Jardineiro 01 curtiu a postagem de Plantas Lindas

-- Postagens Salvas
INSERT INTO SavedPosts (post_id, user_id) VALUES 
(1, 2), -- Plantas Lindas salvou a postagem de Jardineiro 01
(2, 1); -- Jardineiro 01 salvou a postagem de Plantas Lindas

-- Comentários
INSERT INTO Comments (post_id, user_id, content) VALUES 
(1, 2, 'Que linda planta!'),
(2, 1, 'Ótima oferta!');

-- Notificações
INSERT INTO Notifications (user_id, type, related_user_id, post_id) VALUES 
(1, 'curtida', 2, 1), -- Notificação para Jardineiro 01 sobre a curtida de Plantas Lindas
(2, 'curtida', 1, 2); -- Notificação para Plantas Lindas sobre a curtida de Jardineiro 01

-- Plantas
INSERT INTO Plants (name, description, image_url) VALUES 
('Rosa', 'Uma bela flor vermelha.', 'http://example.com/rosa.jpg'),
('Cacto', 'Planta suculenta resistente.', 'http://example.com/cacto.jpg');

-- Doenças
INSERT INTO Diseases (name, description, image_url) VALUES 
('Fungos', 'Doença comum em plantas.', 'http://example.com/fungos.jpg'),
('Pulgões', 'Insetos que atacam plantas.', 'http://example.com/pulgoes.jpg');

-- Assinaturas
INSERT INTO Subscriptions (user_id, type, start_date, end_date) VALUES 
(1, 'mensal', '2024-01-01', '2024-02-01'),
(2, 'anual', '2024-01-01', '2025-01-01');
