"use client";
import React, { useState, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Grid2x2,
  History,
  Edit2,
  Trash2,
  ToggleLeft,
  Eye,
} from "lucide-react";

// ---------- Utility ----------
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ---------- Card Components ----------
function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white text-gray-900 flex flex-col gap-4 rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow",
        className
      )}
      {...props}
    />
  );
}
function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 px-6 pt-4", className)}
      {...props}
    />
  );
}
function CardTitle({ className, ...props }) {
  return <div className={cn("text-lg font-semibold", className)} {...props} />;
}
function CardContent({ className, ...props }) {
  return <div className={cn("px-6 pb-4", className)} {...props} />;
}
function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex justify-end items-center px-6 pb-4 gap-2", className)}
      {...props}
    />
  );
}

// ---------- Input ----------
function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "border rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

// ---------- Textarea ----------
function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "border rounded-md px-3 py-2 w-full min-h-[4rem] text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

// ---------- Label ----------
function Label({ className, ...props }) {
  return (
    <label
      className={cn("block text-sm font-medium text-gray-700 mb-1", className)}
      {...props}
    />
  );
}

// ---------- Button ----------
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const buttonClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
    variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700" : "",
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
      : "bg-blue-600 text-white hover:bg-blue-700",
    size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4",
    className
  );
  const Comp = asChild ? Slot : "button";
  return <Comp className={buttonClasses} {...props} />;
}

// ---------- Badge ----------
function Badge({ className, variant = "default", ...props }) {
  const badgeClasses = cn(
    "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
    variant === "secondary"
      ? "bg-gray-200 text-gray-800"
      : "bg-green-500 text-white",
    className
  );
  return <span className={badgeClasses} {...props} />;
}

// ---------- Tabs ----------
function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}
function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-12 w-fit items-center justify-start rounded-lg bg-gray-100 p-1 gap-2",
        className
      )}
      {...props}
    />
  );
}
function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-colors",
        className
      )}
      {...props}
    />
  );
}
function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

// ---------- Skeleton ----------
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("bg-gray-300 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

// ---------- AlertDialog ----------
function AlertDialog({ ...props }) {
  return <AlertDialogPrimitive.Root {...props} />;
}
function AlertDialogTrigger({ ...props }) {
  return <AlertDialogPrimitive.Trigger {...props} />;
}
function AlertDialogContent({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
      <AlertDialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}
function AlertDialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}
function AlertDialogFooter({ className, ...props }) {
  return <div className={cn("flex justify-end gap-2", className)} {...props} />;
}
function AlertDialogTitle({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Title
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}
function AlertDialogDescription({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Description
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}
function AlertDialogAction({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(
        "bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700",
        className
      )}
      {...props}
    />
  );
}
function AlertDialogCancel({ className, ...props }) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(
        "border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50",
        className
      )}
      {...props}
    />
  );
}

// ---------- Main UserDashboard ----------
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [editingListing, setEditingListing] = useState(null);
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [stats, setStats] = useState({
    activeListings: 0,
    totalOrders: 0,
    savedItems: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    const mockUser = {
      name: "Sarah Johnson",
      isAuthenticated: true,
      email: "sarah.johnson@example.com",
      location: "New York, USA",
    };
    setUser(mockUser);
    setStats({
      activeListings: 12,
      totalOrders: 8,
      savedItems: 24,
      totalEarnings: 450.5,
    });
    setListings([
      {
        id: 1,
        title: "Vintage Leather Jacket",
        price: 89.99,
        status: "active",
        views: 45,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
      },
      {
        id: 2,
        title: "Designer Sunglasses",
        price: 125.0,
        status: "inactive",
        views: 12,
        image:
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      },
      {
        id: 3,
        title: "Wool Winter Coat",
        price: 65.0,
        status: "active",
        views: 78,
        image:
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=300&fit=crop",
      },
    ]);
    setPurchases([
      {
        id: "ORD-001",
        date: "2024-01-15",
        items: ["Organic Cotton T-Shirt", "Hemp Tote Bag"],
        total: 45.98,
        status: "delivered",
      },
      {
        id: "ORD-002",
        date: "2024-01-12",
        items: ["Bamboo Utensil Set"],
        total: 24.99,
        status: "shipped",
      },
      {
        id: "ORD-003",
        date: "2024-01-08",
        items: ["Recycled Notebook", "Eco Pen Set"],
        total: 18.5,
        status: "delivered",
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) return <Skeleton className="h-64 w-full" />;

  if (!user || !user.isAuthenticated)
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Access Required</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full">Sign In</Button>
        </CardContent>
      </Card>
    );

  const handleEditListing = (listing) => setEditingListing(listing);
  const handleToggleListingStatus = (id) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: l.status === "active" ? "inactive" : "active" }
          : l
      )
    );
    toast.success("Listing status updated");
  };
  const handleDeleteListing = (id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
    toast.success("Listing deleted successfully");
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      <h1
        className="text-3xl font-bold text-center bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(to right, #007BFF, #005FCC)",
        }}
      >
        Welcome back, {user.name}!
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <CardContent className="flex flex-col items-start">
            <p className="text-sm opacity-80">Active Listings</p>
            <p className="text-2xl font-bold">{stats.activeListings}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <CardContent className="flex flex-col items-start">
            <p className="text-sm opacity-80">Total Orders</p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <CardContent className="flex flex-col items-start">
            <p className="text-sm opacity-80">Saved Items</p>
            <p className="text-2xl font-bold">{stats.savedItems}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <CardContent className="flex flex-col items-start">
            <p className="text-sm opacity-80">Total Earnings</p>
            <p className="text-2xl font-bold">${stats.totalEarnings}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="listings">
            <Grid2x2 className="h-5 w-5" /> My Listings
          </TabsTrigger>
          <TabsTrigger value="purchases">
            <History className="h-5 w-5" /> My Purchases
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Recent Activity + Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recent Activity Card */}
            {/* Recent Activity Card */}
            <Card className="border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    icon: <History className="h-5 w-5 text-blue-500" />,
                    text: "Order #ORD-003 has been delivered",
                  },
                  {
                    icon: <Edit2 className="h-5 w-5 text-green-500" />,
                    text: 'Updated listing: "Designer Sunglasses"',
                  },
                  {
                    icon: <Grid2x2 className="h-5 w-5 text-purple-500" />,
                    text: 'New product added: "Eco Tote Bag"',
                  },
                  {
                    icon: (
                      <LayoutDashboard className="h-5 w-5 text-yellow-500" />
                    ),
                    text: "Total earnings reached $450.5",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-sm"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <p className="text-gray-700 text-sm font-medium">
                      {item.text}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card className="border-l-4 border-green-500">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-600">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Location:</span>
                  <span className="text-gray-600">
                    {user.location || "Not set"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="text-gray-600">
                    {user.email || "Not set"}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm">Edit Profile</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Profile</AlertDialogTitle>
                      <AlertDialogDescription>
                        Update your profile information below.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="editName">Name</Label>
                        <Input
                          id="editName"
                          placeholder="Enter your name"
                          value={user.name}
                          onChange={(e) =>
                            setUser((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="editEmail">Email</Label>
                        <Input
                          id="editEmail"
                          type="email"
                          placeholder="Enter your email"
                          value={user.email || ""}
                          onChange={(e) =>
                            setUser((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="editLocation">Location</Label>
                        <Input
                          id="editLocation"
                          placeholder="Enter your location"
                          value={user.location || ""}
                          onChange={(e) =>
                            setUser((prev) => ({
                              ...prev,
                              location: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </CardContent>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          toast.success("Profile updated successfully");
                        }}
                      >
                        Save
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Listings */}
        <TabsContent value="listings">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Listings</h2>

            {/* Add Listing Modal */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Add Listing</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Add New Listing</AlertDialogTitle>
                  <AlertDialogDescription>
                    Fill out the form to add your product.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <Input
                      id="productName"
                      placeholder="Enter product name"
                      value={editingListing?.title || ""}
                      onChange={(e) =>
                        setEditingListing((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter price"
                      value={editingListing?.price || ""}
                      onChange={(e) =>
                        setEditingListing((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Product Image</Label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () =>
                            setEditingListing((prev) => ({
                              ...prev,
                              image: reader.result,
                            }));
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="mt-1"
                    />
                    {editingListing?.image && (
                      <img
                        src={editingListing.image}
                        alt="Preview"
                        className="mt-2 h-32 w-full object-cover rounded-md"
                      />
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter product description"
                      value={editingListing?.description || ""}
                      onChange={(e) =>
                        setEditingListing((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </CardContent>

                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setEditingListing(null)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (
                        !editingListing?.title ||
                        !editingListing?.price ||
                        !editingListing?.image
                      ) {
                        toast.error("Please fill all required fields");
                        return;
                      }

                      if (editingListing.id) {
                        setListings((prev) =>
                          prev.map((l) =>
                            l.id === editingListing.id ? editingListing : l
                          )
                        );
                      } else {
                        setListings((prev) => [
                          ...prev,
                          {
                            ...editingListing,
                            id: Date.now(),
                            status: "active",
                            views: 0,
                          },
                        ]);
                      }
                      toast.success("Listing saved successfully");
                      setEditingListing(null);
                    }}
                  >
                    Save
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {listings.length === 0 ? (
            <Card className="text-center">
              <CardContent>No listings yet</CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <Card key={listing.id} className="relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <Badge className="absolute top-2 right-2">
                    {listing.status}
                  </Badge>
                  <CardContent>
                    <h3 className="font-semibold text-lg">{listing.title}</h3>
                    <p className="text-blue-600 font-bold text-lg">
                      ${listing.price}
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {listing.views} views
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      size="sm"
                      onClick={() => handleEditListing(listing)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleToggleListingStatus(listing.id)}
                    >
                      <ToggleLeft className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Listing</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{listing.title}"?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Purchases */}
        <TabsContent value="purchases">
          {purchases.length === 0 ? (
            <Card className="text-center">
              <CardContent>No purchases yet</CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases.map((order) => (
                <Card key={order.id}>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Order {order.id}</h3>
                      <Badge
                        variant={
                          order.status === "delivered" ? "default" : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Ordered on {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="mt-1">Items: {order.items.join(", ")}</p>
                    <p className="mt-1 font-bold">Total: ${order.total}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
