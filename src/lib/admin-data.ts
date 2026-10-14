import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Order } from "@/lib/models/Order";
import { Submission } from "@/lib/models/Submission";
import { Review } from "@/lib/models/Review";
import { BlogPost } from "@/lib/models/BlogPost";
import { Coupon } from "@/lib/models/Coupon";
import { PaymentMethod } from "@/lib/models/PaymentMethod";

export type DashboardStats = {
  products: number;
  published: number;
  orders: number;
  pendingOrders: number;
  messages: number;
  newMessages: number;
  pendingReviews: number;
  posts: number;
  coupons: number;
  paymentMethods: number;
};

export async function getDashboardStats(): Promise<
  { ok: true; stats: DashboardStats } | { ok: false; error: string }
> {
  try {
    await connectDB();
    const [
      products,
      published,
      orders,
      pendingOrders,
      messages,
      newMessages,
      pendingReviews,
      posts,
      coupons,
      paymentMethods,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ status: "published" }),
      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Submission.countDocuments(),
      Submission.countDocuments({ status: "new" }),
      Review.countDocuments({ status: "pending" }),
      BlogPost.countDocuments(),
      Coupon.countDocuments(),
      PaymentMethod.countDocuments(),
    ]);

    return {
      ok: true,
      stats: {
        products,
        published,
        orders,
        pendingOrders,
        messages,
        newMessages,
        pendingReviews,
        posts,
        coupons,
        paymentMethods,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Database error" };
  }
}

export async function getRecentOrders(limit = 8) {
  try {
    await connectDB();
    const docs = await Order.find().sort({ createdAt: -1 }).limit(limit).lean();
    return docs.map((d) => ({
      id: String(d._id),
      orderNumber: d.orderNumber,
      email: d.email,
      total: d.total,
      currency: d.currency,
      status: d.status,
      createdAt: (d.createdAt as Date | undefined)?.toISOString() ?? "",
    }));
  } catch {
    return [];
  }
}
