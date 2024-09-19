import { useState } from "react";
import { Modal, Input, Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for routing

const { Option } = Select;

export default function Tab() {
  const [activeTab, setActiveTab] = useState("Boards");
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false); // To handle Board Modal visibility
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceType, setWorkspaceType] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [workspaces, setWorkspaces] = useState([]); // State to hold workspaces
  const [boardTitle, setBoardTitle] = useState(""); // State for the board title
  const [background, setBackground] = useState(""); // State for selected background
  const [visibility, setVisibility] = useState("Workspace");

  const router = useRouter(); // Initialize the router

  // Function to open Workspace modal
  const handleCreateWorkspace = () => {
    setShowWorkspaceModal(true);
  };

  // Function to close Workspace modal
  const handleCancelWorkspace = () => {
    setShowWorkspaceModal(false);
  };

  // Function to open Board modal
  const handleCreateBoard = () => {
    setShowBoardModal(true);
  };

  // Function to close Board modal
  const handleCancelBoard = () => {
    setShowBoardModal(false);
  };

  // Function to add workspace on confirmation
  const handleOkWorkspace = () => {
    const newWorkspace = {
      name: workspaceName,
      type: workspaceType,
      description: workspaceDescription,
      boards: [], // Initial empty boards for the workspace
    };

    // Add the new workspace to the workspaces list
    setWorkspaces([...workspaces, newWorkspace]);

    // Reset input fields
    setWorkspaceName("");
    setWorkspaceType("");
    setWorkspaceDescription("");
    setShowWorkspaceModal(false);
  };

  // Function to add a new board to the workspace and navigate to its page
  const addBoardToWorkspace = (index) => {
    if (!boardTitle || !background) {
      return; // Prevent adding a board without title or background
    }

    const updatedWorkspaces = [...workspaces];
    const newBoardId = updatedWorkspaces[index].boards.length + 1; // Generate a simple ID for the board

    // Add the new board to the workspace
    updatedWorkspaces[index].boards.push({
      id: newBoardId,
      title: boardTitle,
      background: background,
    });

    setWorkspaces(updatedWorkspaces);
    setShowBoardModal(false); // Close modal after board creation
    setBoardTitle(""); // Reset the board title
    setBackground(""); // Reset the background

    // Navigate to the new board's page with its ID
   
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/4 p-4">
        <nav className="space-y-4">
          <button
            className={`${
              activeTab === "Boards" ? "bg-blue-600" : ""
            } flex items-center space-x-2 w-full py-2 px-4 text-left hover:bg-gray-700 rounded-lg`}
            onClick={() => setActiveTab("Boards")}
          >
            <span className="text-blue-500">📋</span> <span>Boards</span>
          </button>
          <button
            className={`${
              activeTab === "Templates" ? "bg-blue-600" : ""
            } flex items-center space-x-2 w-full py-2 px-4 text-left hover:bg-gray-700 rounded-lg`}
            onClick={() => setActiveTab("Templates")}
          >
            <span>📄</span> <span>Templates</span>
          </button>
          <button
            className={`${
              activeTab === "Home" ? "bg-blue-600" : ""
            } flex items-center space-x-2 w-full py-2 px-4 text-left hover:bg-gray-700 rounded-lg`}
            onClick={() => setActiveTab("Home")}
          >
            <span>🏠</span> <span>Home</span>
          </button>
          <div className="mt-4">
            <p className="text-gray-400">Workspaces</p>
            <button
              className="flex items-center space-x-2 w-full py-2 px-4 text-left hover:bg-gray-700 rounded-lg"
              onClick={handleCreateWorkspace}
            >
              <span>➕</span> <span>Create a Workspace</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="w-3/4 p-6 bg-gray-900">
        {activeTab === "Boards" && (
          <div className="space-y-6">
          <div>
              <h1 className="text-2xl mb-6">Most popular templates</h1>
              {/* Dropdown */}
              <div className="flex justify-between items-center mb-4">
                <p>Get going faster with a template from the community</p>
                <select className="bg-gray-800 text-white p-2 rounded-lg">
                  <option>Choose a category</option>
                  <option>Project Management</option>
                  <option>Kanban</option>
                  <option>Team Collaboration</option>
                </select>
              </div>
              {/* Template Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-700 p-10 rounded-lg" style={{
                  backgroundImage: `url('/hero1.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  <p className="text-lg">Project Management</p>
                </div>
                <div className="bg-gray-700 p-10 rounded-lg" style={{
                  backgroundImage: `url('/hero2.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  <p className="text-lg font-bold">Kanban Template</p>
                </div>
                <div className="bg-gray-700 p-10 rounded-lg" style={{
                  backgroundImage: `url('/hero3.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  <p className="text-lg font-bold">Simple Project Board</p>
                </div>
                <div className="bg-gray-700 p-10 rounded-lg" style={{
                  backgroundImage: `url('/hero4.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}>
                  <p className="text-lg font-bold">Remote Team Hub</p>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-2xl mb-6">Your Workspaces</h1>
              {workspaces.length > 0 ? (
                <div className="space-y-6">
                  {workspaces.map((workspace, index) => (
                    <div key={index} className="bg-gray-700 p-6 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="bg-green-500 p-2 rounded-lg text-black font-bold">
                            {workspace.name.charAt(0).toUpperCase()}
                          </span>
                          <span>{workspace.name}</span>
                        </div>
                        <div className="flex space-x-4">
                          <button className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-600">
                            Boards
                          </button>
                          <button className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-600">
                            Views
                          </button>
                          <button className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-600">
                            Members
                          </button>
                          <button className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-600">
                            Settings
                          </button>
                          <button className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500">
                            Upgrade
                          </button>
                        </div>
                      </div>

                      {/* Create new board button */}
                      <div className="mt-4">
                        <button
                          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                          onClick={handleCreateBoard} // Opens Board modal
                        >
                          Create new board
                        </button>
                      </div>

                      {/* Display boards associated with this workspace */}
                      <div className="mt-4">
                        {workspace.boards.length > 0 ? (
                          <div className="grid grid-cols-4 gap-4" >
                            {workspace.boards.map((board, i) => (
                              <div key={i} className="bg-gray-600 p-4 rounded-lg" onClick={()=> router.push(`/board/${i}`)} style={{
                                backgroundImage: `url(${board.background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}>
                                <p>{board.title}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 mt-2">No boards created yet.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No workspaces created yet.</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Ant Design Modal for Create Workspace */}
      <Modal
        title={null}
        visible={showWorkspaceModal}
        onOk={handleOkWorkspace}
        onCancel={handleCancelWorkspace}
        footer={null}
        className="custom-modal"
        width={900}
        bodyStyle={{ backgroundColor: "#1A202C", color: "white", display: "flex" }}
      >
        <div className="flex flex-row">
          {/* Left Section - Form */}
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-semibold mb-4">Let's build a Workspace</h1>
            <p className="mb-6">
              Boost your productivity by making it easier for everyone to access boards in one location.
            </p>

            <div className="mt-4">
              <label className="block mb-1 text-gray-300">Workspace name</label>
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Enter workspace name"
                className="bg-white text-black border-none"
              />
              <p className="text-xs text-gray-400">This is the name of your company, team, or organization.</p>
            </div>

            <div className="mt-4">
              <label className="block mb-1 text-gray-300">Workspace type</label>
              <Select
                value={workspaceType}
                onChange={(value) => setWorkspaceType(value)}
                placeholder="Choose..."
                className="w-full"
              >
                <Option value="Business">Business</Option>
                <Option value="Education">Education</Option>
                <Option value="Non-profit">Non-profit</Option>
              </Select>
            </div>

            <div className="mt-4">
              <label className="block mb-1 text-gray-300">Workspace description</label>
              <Input.TextArea
                value={workspaceDescription}
                onChange={(e) => setWorkspaceDescription(e.target.value)}
                placeholder="Describe your workspace (Optional)"
                className="bg-white text-black border-none"
              />
              <p className="text-xs text-gray-400">Get your members on board with a few words about your workspace.</p>
            </div>

            <div className="mt-6">
              <button
                onClick={handleOkWorkspace}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={!workspaceName || !workspaceType}
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex-1 p-8 flex justify-center items-center bg-gray-700 rounded-r-lg">
            <Image
              src="/image1.png" // Adjust your image source as per your image location
              alt="Workspace Illustration"
              width={300}
              height={300}
            />
          </div>
        </div>
      </Modal>

      {/* Ant Design Modal for Create Board */}
      <Modal
        title="Create board"
        visible={showBoardModal}
        onCancel={handleCancelBoard}
        footer={null}
        className="custom-modal"
        width={500}
     
      >
        <div className="space-y-4">
          {/* Background Selection */}
          <div>
            <p className="text-gray-400">Background</p>
            <div className="flex space-x-2">
              {['/hero1.jpg', '/hero2.jpg', '/hero3.jpg', '/hero4.jpg'].map((imgSrc, index) => (
                <div
                  key={index}
                  onClick={() => setBackground(imgSrc)}
                  className={`w-16 h-16 bg-cover rounded-lg cursor-pointer ${
                    background === imgSrc ? 'border-4 border-blue-500' : ''
                  }`}
                  style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundPosition: 'center',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Board Title */}
          <div>
            <label className="block text-gray-400">Board title *</label>
            <Input
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              placeholder="Enter board title"
              className="bg-white text-black"
            />
            {!boardTitle && (
              <p className="text-red-500 text-xs mt-1">Board title is required</p>
            )}
          </div>

          {/* Visibility Dropdown */}
          <div>
            <label className="block text-gray-400">Visibility</label>
            <Select
              value={visibility}
              onChange={(value) => setVisibility(value)}
              className="w-full bg-gray-800"
            >
              <Option value="Workspace">Workspace</Option>
              <Option value="Private">Private</Option>
            </Select>
          </div>

          {/* Create Button */}
          <button
            onClick={() => addBoardToWorkspace(0)} // Assuming adding to the first workspace
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!boardTitle}
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
}
