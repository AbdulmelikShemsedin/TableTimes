function MenuItemCard({ item, onEdit, onDelete }) {
    return (
      <div className="border p-4 rounded flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{item.name} - ${item.price}</h3>
          <p className="text-gray-600">{item.description}</p>
          {!item.available && <span className="text-red-600">Out of stock</span>}
        </div>
        <div className="space-x-2">
          <button onClick={onEdit} className="text-blue-500">Edit</button>
          <button onClick={onDelete} className="text-red-500">Delete</button>
        </div>
      </div>
    );
  }
  
  export default MenuItemCard;
  