// ข้อมูลสินค้า (สังเกตว่ามีการเพิ่ม room ว่าสินค้านี้เหมาะกับห้องไหน)
const furnitureData = [
    // --- โซฟา ---
    { id: 1, name: "Modern Sofa", category: "sofa", room: ["living_room"], price: 1590, description: "โซฟานั่งสบาย", modelFile: "assets/models/sofa.glb", image: "" },
    { id: 2, name: "Yellow Divan Sofa", category: "sofa", room: ["living_room"], price: 5900, description: "โซฟาสีเหลือง สำหรับห้องนั่งเล่น", modelFile: "assets/models/sofa__divan_mebel.glb", image: "" },
    { id: 3, name: "Black Divan Sofa", category: "sofa", room: ["living_room", "workspace"], price: 3500, description: "โซฟาสีดำ ทรงกว้าง", modelFile: "assets/models/black_sofa_divan.glb", image: "" },

    // --- เก้าอี้ ---
    { id: 4, name: "Wooden Dining Chair", category: "chair", room: ["dining_room", "workspace"], price: 8500, description: "เก้าอี้ไม้เอนกประสงค์", modelFile: "assets/models/wooden_dining_chair.glb", image: "" },

    // --- โคมไฟ ---
    { id: 5, name: "Table Lamp 01", category: "lamp", room: ["bedroom", "workspace", "living_room"], price: 1290, description: "โคมไฟตั้งโต๊ะแสงนวล", modelFile: "assets/models/table_lamp_01.glb", image: "" },
    { id: 8, name: "Japanese Lamp", category: "lamp", room: ["bedroom", "living_room"], price: 1590, description: "โคมไฟสไตล์ญี่ปุ่น", modelFile: "assets/models/japanese_lamp.glb", image: "" },

    // --- โต๊ะ ---
    { id: 9, name: "Round Table", category: "table", room: ["living_room", "dining_room"], price: 1591, description: "โต๊ะกลมเอนกประสงค์", modelFile: "assets/models/table_ronde.glb", image: "" },
    { id: 10, name: "Folding Table", category: "table", room: ["workspace", "bedroom"], price: 1592, description: "โต๊ะพับเก็บได้", modelFile: "assets/models/folding_table.glb", image: "" },
    { id: 11, name: "Industrial Table", category: "table", room: ["workspace", "dining_room"], price: 1593, description: "โต๊ะทำงานสไตล์ลอฟท์", modelFile: "assets/models/industrial_table.glb", image: "" },
    { id: 12, name: "Bar Table", category: "table", room: ["dining_room", "living_room"], price: 1594, description: "โต๊ะบาร์ทรงสูง", modelFile: "assets/models/bar_table.glb", image: "" },
    { id: 13, name: "Mahogany Table", category: "table", room: ["dining_room"], price: 1595, description: "โต๊ะไม้หรูหรา", modelFile: "assets/models/mahogany_table.glb", image: "" },

    // --- ตู้ ---
    { id: 14, name: "Vintage Cupboard", category: "cupboard", room: ["bedroom", "living_room"], price: 4500, description: "ตู้ไม้สไตล์วินเทจ", modelFile: "assets/models/cupboard.glb", image: "" },
    { id: 15, name: "Office Cabinet", category: "cupboard", room: ["workspace"], price: 3200, description: "ตู้เอกสารสำหรับออฟฟิศ", modelFile: "assets/models/cupboard_desk_game_asset.glb", image: "" },
    { id: 16, name: "Wooden Cabinet", category: "cupboard", room: ["bedroom", "living_room"], price: 3200, description: "ตู้ไม้เก็บของ", modelFile: "assets/models/wooden_cupboard_with_door.glb", image: "" }
];

let currentSelectedRoom = '';

// ฟังก์ชันเมื่อกดเลือกห้อง
function selectRoom(roomKey, roomName) {
    currentSelectedRoom = roomKey;
    
    // ซ่อนหน้าเลือกห้อง, โชว์หน้าสินค้า
    document.getElementById('room-selection').style.display = 'none';
    document.getElementById('product-section').style.display = 'block';
    document.getElementById('current-room-title').innerText = 'สินค้าสำหรับแต่ง: ' + roomName;

    generateSubCategories(roomKey);
    renderProducts(roomKey, 'all');

    window.scrollTo({ top: document.getElementById('product-section').offsetTop - 20, behavior: "smooth" });
}

// ฟังก์ชันกดปุ่ม "กลับไปเลือกห้อง"
function goBackToRooms() {
    document.getElementById('room-selection').style.display = 'block';
    document.getElementById('product-section').style.display = 'none';
    window.scrollTo({ top: document.getElementById('room-selection').offsetTop - 50, behavior: "smooth" });
}

// ฟังก์ชันสร้างปุ่มหมวดหมู่ย่อยอัตโนมัติ (เฉพาะของที่มีในห้องนั้น)
function generateSubCategories(roomKey) {
    const filterContainer = document.getElementById('sub-category-filters');
    filterContainer.innerHTML = '';
    
    let categoriesInRoom = new Set();
    furnitureData.forEach(item => {
        if (item.room.includes(roomKey)) {
            categoriesInRoom.add(item.category);
        }
    });

    filterContainer.innerHTML += `<button class="btn-filter active" onclick="filterData('${roomKey}', 'all', this)">ทั้งหมด</button>`;
    
    const categoryNames = { chair: "เก้าอี้", sofa: "โซฟา", table: "โต๊ะ", lamp: "โคมไฟ", cupboard: "ตู้" };

    categoriesInRoom.forEach(cat => {
        filterContainer.innerHTML += `<button class="btn-filter" onclick="filterData('${roomKey}', '${cat}', this)">${categoryNames[cat] || cat}</button>`;
    });
}

// ฟังก์ชันกรองข้อมูลเมื่อกดปุ่มหมวดหมู่ย่อย
function filterData(roomKey, categoryKey, btnElement) {
    renderProducts(roomKey, categoryKey);
    document.querySelectorAll('#sub-category-filters .btn-filter').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
}

// ฟังก์ชันสร้าง HTML สินค้าออกมาโชว์
function renderProducts(roomFilter, categoryFilter) {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; 

    furnitureData.forEach(item => {
        const isInRoom = item.room.includes(roomFilter);
        const isInCategory = (categoryFilter === 'all' || item.category === categoryFilter);

        if (isInRoom && isInCategory) {
            const card = document.createElement('div');
            card.className = 'product-card bubble-pop';
            const viewerId = `model-${item.id}`;

            card.innerHTML = `
                <div class="model-wrapper">
                    <model-viewer id="${viewerId}" src="${item.modelFile}" alt="${item.name}"
                        ar ar-modes="scene-viewer webxr quick-look" camera-controls shadow-intensity="1" auto-rotate reveal="auto"
                        style="width: 100%; height: 100%;">
                    </model-viewer>
                </div>
                <div class="product-info">
                    <span class="category-tag">${item.category.toUpperCase()}</span>
                    <h3>${item.name}</h3>
                    <p class="desc">${item.description}</p>
                    <button class="btn-ar" onclick="document.getElementById('${viewerId}').activateAR()">วางโมเดล AR 📱</button>
                </div>
            `;
            container.appendChild(card);
        }
    });
    observeElements();
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.bubble-pop').forEach(el => observer.observe(el));
}